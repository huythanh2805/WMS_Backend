import { PrismaService } from "src/prisma/prisma.service"
import { BaseRepositoryAbstract } from "./base/base.abstract.respository"
import { $Enums, ActivityType, Task } from "@prisma/client"
import { HttpException, Injectable, NotFoundException } from "@nestjs/common"
import { TaskInterface } from "src/task/interfaces/task.interface"
import { FindAllResponse } from "src/types/common.type"
import { CreateTaskDto } from "src/task/dto/create-task.dto"

@Injectable()
export class TaskRepository
  extends BaseRepositoryAbstract<Task>
  implements TaskInterface
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma, prisma.task)
  }
  async createNewTask(createDto: CreateTaskDto, userId: string): Promise<Task> {
    try {
      return await this.prisma.$transaction(
        async (tx) => {
          // 1. Tìm task có position lớn nhất trong cùng status
          const largestPositionTask = await tx.task.findFirst({
            where: {
              status: createDto.status,
              // Nếu task thuộc project cụ thể thì nên thêm điều kiện này
              // projectId: createDto.projectId,   ← thường nên có để tránh race condition giữa các project
            },
            orderBy: {
              position: "desc",
            },
            select: {
              position: true,
            },
          })

          const position = largestPositionTask
            ? largestPositionTask.position + 1000
            : 1000

          // 2. Tạo task mới với position đã tính
          const newTask = await tx.task.create({
            data: {
              ...createDto,
              position,
            },
          })

          // 3. Tạo activity log
          await tx.activity.create({
            data: {
              type: ActivityType.POST,
              description: `Task "${newTask.title}" Created`,
              userId: userId,
              projectId: newTask.projectId,
            },
          })

          // Trả về task để controller/service sử dụng
          return newTask
        },
        {
          // Tuỳ chọn: tăng timeout nếu logic phức tạp hơn sau này
          // timeout: 7000,     // mặc định 5000ms
          // maxWait: 2000,
        },
      )
    } catch (error) {
      throw new HttpException(error.response.message, 500)
    }
  }
  async findAll(
    condition?: any,
    options?: any,
  ): Promise<FindAllResponse<Task>> {
    const tasks = await this.prisma.task.findMany({
      where: condition,
      include: {
        assignedTo: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })
    return {
      count: tasks.length,
      items: tasks,
    }
  }
  async findTaskById(id: string, projection?: any): Promise<Task | null> {
    return this.prisma.task.findFirst({
      where: {
        id,
      },
      include: {
        comments: {
          orderBy: {
            createdAt: "desc",
          },
          include: {
            user: true,
          },
        },
        documentation: true,
        attachments: true,
        assignedTo: true,
      },
    })
  }

  async updateTask(
    id: string,
    dto: Partial<Task>,
    userId: string,
  ): Promise<Task> {
    try {
      const result = await this.prisma.$transaction(async (tx) => {
        const newTask = await tx.task.update({
          where: { id },
          data: dto,
          include: {
            assignedTo: true,
          },
        })

        await tx.activity.create({
          data: {
            type: ActivityType.POST,
            description: `Task "${newTask.title}" was updated`,
            userId: userId,
            projectId: newTask.projectId,
          },
        })

        return newTask
      })

      return result
    } catch (error: any) {
      throw new HttpException(error?.message || "Update task failed", 500)
    }
  }
}
