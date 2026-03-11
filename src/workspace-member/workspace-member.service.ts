import { HttpException, Injectable } from '@nestjs/common';
import { CreateWorkspaceMemberDto } from './dto/create-workspace-member.dto';
import { UpdateWorkspaceMemberDto } from './dto/update-workspace-member.dto';
import { BaseAbstractService } from 'src/services/base/base.abstract.service';
import { WorkspaceMember } from './entities/workspace-member.entity';
import { WorkspaceMemberRepository } from 'src/respositories/workspace-member.respository';
import { FindAllResponse } from 'src/types/common.type';

@Injectable()
export class WorkspaceMemberService extends BaseAbstractService<WorkspaceMember> {
  constructor(private readonly workspaceMemberRepository: WorkspaceMemberRepository) {
    super(workspaceMemberRepository)
  }

  async findAllByWorkspaceId(filter?: object, options?: object): Promise<FindAllResponse<WorkspaceMember>> {
    try {
      return this.workspaceMemberRepository.findAllByWorkspaceId(filter)
    } catch (error) {
      throw new HttpException("Failed to retrieve workspace-members", 500)
    }
  }
  async deleteWorkspaceMember(id: string): Promise<WorkspaceMember> {
    try {
      return this.workspaceMemberRepository.deleteWorkspaceMember(id)
    } catch (error) {
      throw new HttpException("Failed to delete workspace-members", 500)
    }
  }
}
