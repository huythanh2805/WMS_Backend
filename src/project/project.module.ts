import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { ProjectRepository } from 'src/respositories/project.respository';
import { ActivityRepository } from 'src/respositories/activity.respository';
import { WorkspaceMemberModule } from 'src/workspace-member/workspace-member.module';
import { ProjectAccessModule } from 'src/project-access/project-access.module';

@Module({
  imports: [WorkspaceMemberModule, ProjectAccessModule],
  controllers: [ProjectController],
  providers: [ProjectService, ProjectRepository, ActivityRepository],
})
export class ProjectModule {}
