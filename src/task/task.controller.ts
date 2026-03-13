import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from "@nestjs/common"
import { TaskService } from "./task.service"
import { CreateTaskDto } from "./dto/create-task.dto"
import { UpdateTaskDto } from "./dto/update-task.dto"
import { JwtAuthGuard } from "src/auth/guards/jwt.guard"
import { AccessGuard } from "src/auth/guards/access-level.guard"
import { AccessLevel } from "@prisma/client"
import { Access } from "src/decorators/user-access"

@UseGuards(JwtAuthGuard, AccessGuard)
@Controller("task")
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Access(AccessLevel.OWNER, AccessLevel.MEMBER)
  @Post("/:projectId")
  create(@Body() createTaskDto: CreateTaskDto, @Req() req) {
    const userId = req.user.userId
    return this.taskService.createNewTask(createTaskDto, userId)
  }
  
  @Get()
  findAll() {
    return this.taskService.findAll()
  }
  // Get tasks by projectId
  @Get("/project/:projectId")
  findTaksByProjectId(@Param("projectId") projectId: string) {
    return this.taskService.findAll({ projectId: projectId })
  }
  // Get tasks by userId
  @Get("/user/:userId")
  findTaksByUserId(@Param("userId") userId: string) {
    return this.taskService.findAll({ assigneeId: userId })
  }
  // Get task by id
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.taskService.findOne(id)
  }
  
  @Access(AccessLevel.OWNER, AccessLevel.MEMBER)
  @Patch("/:projectId/:id")
  updateTask(
    @Param("id") id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @Req() req,
  ) {
    const userId = req.user.userId
    return this.taskService.updateTask(id, updateTaskDto, userId)
  }
  
  @Access(AccessLevel.OWNER, AccessLevel.MEMBER)
  @Delete("/:projectId/:id")
  remove(@Param("id") id: string) {
    return this.taskService.remove(id)
  }
}
