import { PrismaService } from "src/prisma/prisma.service"
import { BaseRepositoryAbstract } from "./base/base.abstract.respository"
import { ProjectAccess } from "@prisma/client"
import { ForbiddenException, Injectable } from "@nestjs/common"
import { ProjectAccessInterface } from "src/project-access/interfaces/project-access.interface"
import { CreateProjectAccessDto } from "src/project-access/dto/create-project-access.dto"

@Injectable()
export class ProjectAccessRepository
  extends BaseRepositoryAbstract<ProjectAccess>
  implements ProjectAccessInterface
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma, prisma.projectAccess)
  }
  async createNewProjectAccess(
    createDto: CreateProjectAccessDto,
  ): Promise<ProjectAccess> {
    const existingProjectAccesses = await this.prisma.projectAccess.findFirst({
      where: {
        AND: {
          workspaceMemberId: createDto.workspaceMemberId,
          projectId: createDto.projectId,
        },
      },
    })

    if (existingProjectAccesses)
      throw new ForbiddenException("User has been assigned to this project")
    return this.prisma.projectAccess.create({
      data: createDto,
      include: {
        project: true,
      },
    })
  }

  async findProjectAccessBy(
    projectId: string,
    userId: string,
  ): Promise<ProjectAccess | null> {
    const projectAccess = await this.prisma.projectAccess.findFirst({
      where: {
        projectId,
        workspaceMember: {
          userId
        },
      },
    })
    return projectAccess
  }
}
