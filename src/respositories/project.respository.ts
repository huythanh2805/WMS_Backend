import { PrismaService } from "src/prisma/prisma.service"
import { BaseRepositoryAbstract } from "./base/base.abstract.respository"
import {
  ConflictException,
  ForbiddenException,
  HttpException,
  Injectable,
  NotFoundException,
} from "@nestjs/common"
import { ProjectInterface } from "src/project/interfaces/project.interface"
import { AccessLevel, ActivityType, Project } from "@prisma/client"
import { ProjectOverviewType } from "src/types"
import { getTasksNumberByStatus } from "src/lib/get-project-overview"
import { CreateProjectDto } from "src/project/dto/create-project.dto"
import { ActivityRepository } from "./activity.respository"
import { FindAllResponse } from "src/types/common.type"

@Injectable()
export class ProjectRepository
  extends BaseRepositoryAbstract<Project>
  implements ProjectInterface
{
  constructor(
    protected readonly prisma: PrismaService,
    private readonly activityRepository: ActivityRepository,
  ) {
    super(prisma, prisma.project)
  }
  async findProjectsByWorkSpaceId(
    workspaceId: string,
    userId: string,
  ): Promise<FindAllResponse<Project>> {
    const projects = await this.prisma.project.findMany({
      where: {
        workspaceId: workspaceId,
        projectAccess: {
          // for 1-n using some
          some: {
            workspaceMember: {
              userId: userId,
              workspaceId: workspaceId,
            },
          },
        },
      },
    })
    return {
      count: projects.length,
      items: projects
    }
  }
  async createNewProject(
    item: CreateProjectDto,
    userId: string,
  ): Promise<Project> {
    return this.prisma.$transaction(
      async (tx) => {
        // 1. Check project name trùng (trong transaction để tránh race condition)
        const existingProject = await tx.project.findFirst({
          where: {
            AND: [{ name: item.name }, { workspaceId: item.workspaceId }],
          },
        })

        if (existingProject) {
          throw new ConflictException("Project with this name already exists")
        }

        // 2. Tạo project
        const newProject = await tx.project.create({
          data: item,
        })

        // 3. Tìm workspaceMember (dùng tx để nhất quán)
        const workspaceMember = await tx.workspaceMember.findFirst({
          where: {
            userId,
            workspaceId: item.workspaceId, // Nên thêm điều kiện này để chính xác hơn
          },
        })
        if (!workspaceMember) {
          throw new ForbiddenException("Workspace-Member Not Found")
        }

        if (workspaceMember.accessLevel !== AccessLevel.OWNER) {
          throw new ForbiddenException("You're not authorized")
        }

        // 4. Tạo ProjectAccess
        await tx.projectAccess.create({
          data: {
            workspaceMemberId: workspaceMember.id,
            projectId: newProject.id,
            accessLevel: workspaceMember.accessLevel,
          },
        })

        // 6. Tạo activity
        await tx.activity.create({
          data: {
            type: ActivityType.POST,
            description: `Project "${newProject.name}" created`,
            userId: userId,
            projectId: newProject.id,
          },
        })

        return newProject
      },
      {
        // Optional: tăng timeout nếu logic phức tạp hơn sau này (mặc định 5000ms)
        // maxWait: 5000,    // thời gian chờ tx (ms)
        timeout: 10000, // thời gian tx tối đa (ms)
      },
    )
  }
  async getProjectOverview({
    workspaceId,
    projectId,
  }: {
    workspaceId: string
    projectId: string
  }): Promise<ProjectOverviewType> {
    const workspaceDetail = await this.prisma.workspace.findFirst({
      where: {
        id: workspaceId,
      },
      include: {
        members: true,
      },
    })
    const projectDetail = await this.prisma.project.findFirst({
      where: {
        id: projectId,
      },
      include: {
        tasks: true,
      },
    })
    if (!projectDetail) {
      throw new NotFoundException("Project not found")
    }
    const projectOverview = getTasksNumberByStatus(projectDetail)
    const {} = projectOverview
    return {
      members: {
        count: workspaceDetail?.members?.length || 0,
        total: workspaceDetail?.members?.length || 0,
        percent: 100,
      },
      project: projectDetail,
      ...projectOverview,
    }
  }
}
