import { HttpException, Injectable } from "@nestjs/common"
import { AccessLevel, Workspace } from "@prisma/client"
import { BaseAbstractService } from "src/services/base/base.abstract.service"
import { WorkspaceRepository } from "src/respositories/workspace.respository"
import { WorkspaceMemberRepository } from "src/respositories/workspace-member.respository"
import { CreateWorkspaceDto } from "./dto/create-workspace.dto"

@Injectable()
export class WorkspaceService extends BaseAbstractService<Workspace> {
  constructor(
    private readonly workspaceRepository: WorkspaceRepository,
    private readonly WorkspaceMemberRepository: WorkspaceMemberRepository,
  ) {
    super(workspaceRepository)
  }
  async findAllWorkspaces({
    ownerId,
  }: {
    ownerId: string
  }): Promise<{ count: number; items: Workspace[] }> {
    try {
      return this.workspaceRepository.findAllWorkSpaces(ownerId)
    } catch (error) {
      throw new HttpException("Failed to retrieve workspaces", 500)
    }
  }
  async create(createDto: CreateWorkspaceDto): Promise<Workspace> {
    try {
      const newWorkSpace = await this.workspaceRepository.create(createDto)
      await this.WorkspaceMemberRepository.create({
        userId: newWorkSpace.ownerId,
        workspaceId: newWorkSpace.id,
        accessLevel: AccessLevel.OWNER,
      })
      return newWorkSpace
    } catch (error) {
      throw new HttpException("Failed to retrieve workspaces", 500)
    }
  }
}
