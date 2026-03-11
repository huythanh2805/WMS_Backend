import { PrismaService } from "src/prisma/prisma.service"
import { BaseRepositoryAbstract } from "./base/base.abstract.respository"
import { AccessLevel, ActivityType, User, Workspace } from "@prisma/client"
import { UserInterface } from "src/user/interfaces/user.interface"
import { HttpException, Injectable } from "@nestjs/common"
import { WorkspaceInterface } from "src/workspace/interfaces/workspace.interface"
import { CreateWorkspaceDto } from "src/workspace/dto/create-workspace.dto"

@Injectable()
export class WorkspaceRepository
  extends BaseRepositoryAbstract<Workspace>
  implements WorkspaceInterface
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma, prisma.workspace)
  }
  async createNewWorkspace(createDto: CreateWorkspaceDto): Promise<Workspace> {
    try {
      const result = await this.prisma.$transaction(async (tx) => {
        // 1. Tạo workspace
        const newWorkSpace = await tx.workspace.create({
          data: {
            ...createDto,
          },
        })

        // 2. Thêm owner vào workspaceMember
        await tx.workspaceMember.create({
          data: {
            userId: newWorkSpace.ownerId,
            workspaceId: newWorkSpace.id,
            accessLevel: AccessLevel.OWNER,
          },
        })

        // 3. Tạo activity
        await tx.activity.create({
          data: {
            type: ActivityType.POST,
            description: `Workspace "${newWorkSpace.name}" created`,
            userId: newWorkSpace.ownerId,
          },
        })

        return newWorkSpace
      })

      return result
    } catch (error: any) {
      throw new HttpException(error?.message || "Create workspace failed", 500)
    }
  }
  async deleteWorkspaceById(id: string): Promise<Workspace> {
    try {
      return this.prisma.workspace.delete({
        where: {
          id
        }
      })
    } catch (error) {
      throw new HttpException("Failed to delete workspaces", 500)
    }
  }
  async findAllWorkSpaces(
    ownerId: string,
  ): Promise<{ count: number; items: Workspace[] }> {
    const workspaces = await this.prisma.workspace.findMany({
      where: {
        OR: [
          { ownerId: ownerId },
          {
            members: {
              some: {
                userId: ownerId,
              },
            },
          },
        ],
      },
    })
    return { count: workspaces.length, items: workspaces }
  }
}
