import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TaskRepository } from 'src/respositories/task.respository';
import { WorkspaceMember } from 'src/workspace-member/entities/workspace-member.entity';

@Module({
  imports: [WorkspaceMember],
  controllers: [TaskController],
  providers: [TaskService, TaskRepository],
})
export class TaskModule {}
