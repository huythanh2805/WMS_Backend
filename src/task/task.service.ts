import { HttpException, Injectable, NotFoundException } from "@nestjs/common"
import { CreateTaskDto } from "./dto/create-task.dto"
import { UpdateTaskDto } from "./dto/update-task.dto"
import { Task } from "./entities/task.entity"
import { BaseAbstractService } from "src/services/base/base.abstract.service"
import { TaskRepository } from "src/respositories/task.respository"
import { FindAllResponse } from "src/types/common.type"

@Injectable()
export class TaskService extends BaseAbstractService<Task> {
  constructor(private readonly taskRepository: TaskRepository) {
    super(taskRepository)
  }

  async findAll(
    filter?: object,
    options?: object,
  ): Promise<FindAllResponse<Task>> {
    try {
      return this.taskRepository.findAll(filter)
    } catch (error) {
      throw new HttpException("Failed to retrieve task", 500)
    }
  }
  async update(id: string, item: Partial<Task>): Promise<Task> {
    try {
      return this.taskRepository.update(id, item)
    } catch (error) {
      throw new HttpException("Failed to update task", 500)
    }
  }
  async findOne(id: string): Promise<Task> {
    try {
      const task = await this.taskRepository.findTaskById(id)
      if(!task){
        throw new NotFoundException("Task not found")
      }
      return task
    } catch (error) {
      throw new HttpException("Failed to update task", 500)
    }
  }
}
