import { PrismaService } from "src/prisma/prisma.service";
import { BaseRepositoryAbstract } from "./base/base.abstract.respository";
import { Task } from "@prisma/client";
import { Injectable } from "@nestjs/common";
import { TaskInterface } from "src/task/interfaces/task.interface";

@Injectable()
export class TaskRepository extends BaseRepositoryAbstract<Task> implements TaskInterface {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma, prisma.task)
}
}