import { Module } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { WorkspaceController } from './workspace.controller';
import { WorkspaceRepository } from 'src/respositories/workspace.respository';
import { WorkspaceMemberModule } from 'src/workspace-member/workspace-member.module';
import { WorkspaceMemberRepository } from 'src/respositories/workspace-member.respository';

@Module({
  imports: [WorkspaceMemberModule],
  controllers: [WorkspaceController],
  providers: [WorkspaceService, WorkspaceRepository, WorkspaceMemberRepository],
})
export class WorkspaceModule {}
