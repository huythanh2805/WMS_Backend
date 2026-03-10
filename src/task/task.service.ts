import { HttpException, Injectable, NotFoundException, UseGuards } from "@nestjs/common"
import { CreateTaskDto } from "./dto/create-task.dto"
import { Task } from "./entities/task.entity"
import { BaseAbstractService } from "src/services/base/base.abstract.service"
import { TaskRepository } from "src/respositories/task.respository"
import { FindAllResponse } from "src/types/common.type"
import { JwtAuthGuard } from "src/auth/guards/jwt.guard"

@UseGuards(JwtAuthGuard)
@Injectable()
export class TaskService extends BaseAbstractService<Task> {
  constructor(private readonly taskRepository: TaskRepository) {
    super(taskRepository)
  }
  async createNewTask (createDto: CreateTaskDto, userId: string): Promise<Task> {
    try {
      return this.taskRepository.createNewTask(createDto, userId)
    } catch (error) {
      throw new HttpException("Create New Task Error", 500)
      
    }
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
  async updateTask(id: string, item: Partial<Task>, userId: string): Promise<Task> {
    try {
      return this.taskRepository.updateTask(id, item, userId)
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
