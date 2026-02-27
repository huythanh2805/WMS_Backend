import { PrismaService } from "src/prisma/prisma.service"
import { BaseRepositoryAbstract } from "./base/base.abstract.respository"
import { Injectable } from "@nestjs/common"
import { ProjectInterface } from "src/project/interfaces/project.interface"
import { Project } from "@prisma/client"

@Injectable()
export class ProjectRepository
  extends BaseRepositoryAbstract<Project>
  implements ProjectInterface
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma, prisma.project)
  }
}
