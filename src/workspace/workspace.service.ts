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
  async createNewWorkSpace(createDto: CreateWorkspaceDto): Promise<Workspace> {
    try {
      return this.workspaceRepository.createNewWorkspace(createDto)
    } catch (error) {
      throw new HttpException("Failed to retrieve workspaces", 500)
    }
  }
  async deleteWorkspaceById(id: string): Promise<Workspace> {
    try {
      return this.workspaceRepository.deleteWorkspaceById(id)
    } catch (error) {
      throw new HttpException("Failed to delete workspaces", 500)
    }
  }
}
