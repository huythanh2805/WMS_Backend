import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TaskRepository } from 'src/respositories/task.respository';

@Module({
  controllers: [TaskController],
  providers: [TaskService, TaskRepository],
})
export class TaskModule {}
