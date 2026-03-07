import { PrismaService } from "src/prisma/prisma.service"
import { BaseRepositoryAbstract } from "./base/base.abstract.respository"
import { $Enums, Task } from "@prisma/client"
import { Injectable, NotFoundException } from "@nestjs/common"
import { TaskInterface } from "src/task/interfaces/task.interface"
import { FindAllResponse } from "src/types/common.type"

@Injectable()
export class TaskRepository
  extends BaseRepositoryAbstract<Task>
  implements TaskInterface
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma, prisma.task)
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
         createdAt: 'desc',
       },
        include: {
          user: true,
        },
      },
        documentation: true,
        attachments: true,
        assignedTo: true
      },
    })
  }

  async update(id: string, dto: Partial<Task>): Promise<Task> {
    return this.prisma.task.update({
      where: { id },
      data: dto,
      include: {
        assignedTo: true,
      },
    })
  }
}
