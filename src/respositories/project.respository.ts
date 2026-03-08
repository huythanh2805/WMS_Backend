import { PrismaService } from "src/prisma/prisma.service"
import { BaseRepositoryAbstract } from "./base/base.abstract.respository"
import { Injectable, NotFoundException } from "@nestjs/common"
import { ProjectInterface } from "src/project/interfaces/project.interface"
import { Project } from "@prisma/client"
import { ProjectOverviewType } from "src/types"
import { getTasksNumberByStatus } from "src/lib/get-project-overview"

@Injectable()
export class ProjectRepository
  extends BaseRepositoryAbstract<Project>
  implements ProjectInterface
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma, prisma.project)
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
        percent: 100
      },
      project: projectDetail,
      ...projectOverview
    }
  }
}
