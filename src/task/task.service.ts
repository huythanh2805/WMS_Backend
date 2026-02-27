import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { BaseAbstractService } from 'src/services/base/base.abstract.service';
import { TaskRepository } from 'src/respositories/task.respository';

@Injectable()
export class TaskService extends BaseAbstractService<Task> {
  constructor(
    private readonly taskRepository: TaskRepository
  ) {
    super(taskRepository);
  }
}
