import { HttpException, Injectable } from "@nestjs/common"
import { Workspace } from "@prisma/client"
import { BaseAbstractService } from "src/services/base/base.abstract.service"
import { WorkspaceRepository } from "src/respositories/workspace.respository"

@Injectable()
export class WorkspaceService extends BaseAbstractService<Workspace> {
  constructor(private readonly workspaceRepository: WorkspaceRepository) {
    super(workspaceRepository)
  }
  async findAllWorkspaces({ownerId}: {ownerId: string}): Promise<{ count: number; items: Workspace[] }> {
    try {
      return this.workspaceRepository.findAllWorkSpaces(ownerId)
    } catch (error) {
      throw new HttpException("Failed to retrieve workspaces", 500)
    }
  }
}
