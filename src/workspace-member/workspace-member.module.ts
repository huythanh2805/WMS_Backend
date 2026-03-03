import { Module } from '@nestjs/common';
import { WorkspaceMemberService } from './workspace-member.service';
import { WorkspaceMemberController } from './workspace-member.controller';
import { WorkspaceMemberRepository } from 'src/respositories/workspace-member.respository';

@Module({
  controllers: [WorkspaceMemberController],
  providers: [WorkspaceMemberService, WorkspaceMemberRepository],
})
export class WorkspaceMemberModule {}
