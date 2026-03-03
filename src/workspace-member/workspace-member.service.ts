import { Injectable } from '@nestjs/common';
import { CreateWorkspaceMemberDto } from './dto/create-workspace-member.dto';
import { UpdateWorkspaceMemberDto } from './dto/update-workspace-member.dto';
import { BaseAbstractService } from 'src/services/base/base.abstract.service';
import { WorkspaceMember } from './entities/workspace-member.entity';
import { WorkspaceMemberRepository } from 'src/respositories/workspace-member.respository';

@Injectable()
export class WorkspaceMemberService extends BaseAbstractService<WorkspaceMember> {
  constructor(private readonly workspaceMemberRepository: WorkspaceMemberRepository) {
    super(workspaceMemberRepository)
  }
}
