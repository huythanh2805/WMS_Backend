import { PrismaService } from "src/prisma/prisma.service"
import { BaseRepositoryAbstract } from "./base/base.abstract.respository"
import { WorkspaceMember } from "@prisma/client"
import { Injectable } from "@nestjs/common"
import { WorkspaceMemberInterface } from "src/workspace-member/interfaces/workspace-member.interface"
import { FindAllResponse } from "src/types/common.type"

@Injectable()
export class WorkspaceMemberRepository
  extends BaseRepositoryAbstract<WorkspaceMember>
  implements WorkspaceMemberInterface
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma, prisma.workspaceMember)
  }
  async findAll(
    condition?: any,
    options?: any,
  ): Promise<FindAllResponse<WorkspaceMember>> {
    const members = await this.prisma.workspaceMember.findMany({
      where: condition,
      include: {
        user: true,
      },
    })
    return {
      count: members.length,
      items: members,
    }
  }
}
