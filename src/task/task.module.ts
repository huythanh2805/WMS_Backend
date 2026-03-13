import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TaskRepository } from 'src/respositories/task.respository';
import { WorkspaceMember } from 'src/workspace-member/entities/workspace-member.entity';
import { WorkspaceMemberModule } from 'src/workspace-member/workspace-member.module';
import { ProjectAccessModule } from 'src/project-access/project-access.module';

@Module({
  imports: [WorkspaceMember, WorkspaceMemberModule, ProjectAccessModule],
  controllers: [TaskController],
  providers: [TaskService, TaskRepository],
})
export class TaskModule {}
