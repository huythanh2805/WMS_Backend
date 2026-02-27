import { PrismaService } from "src/prisma/prisma.service"
import { FindAllResponse } from "src/types/common.type"
import { BaseRepositoryInterface } from "./base.interface.respository"

export abstract class BaseRepositoryAbstract<
  T,
> implements BaseRepositoryInterface<T> {
  constructor(
    protected readonly prisma: PrismaService,
    protected readonly model: any, // Prisma delegate (e.g prisma.user)
  ) {}

  async create(dto: T | any): Promise<T> {
    return this.model.create({
      data: dto,
    })
  }

  async findOneById(id: string, projection?: any): Promise<T> {
    return this.model.findFirst({
      where: {
        id,
      },
      select: projection,
    })
  }

  async findOneByCondition(
    condition: object = {},
    projection?: any,
  ): Promise<T> {
    return this.model.findFirst({
      where: {
        ...condition,
      },
      select: projection,
    })
  }

  async findAll(
    condition: any = {},
    options: any = {},
  ): Promise<FindAllResponse<T>> {
    const { skip, take, orderBy, select } = options

    const where = {
      ...condition,
    }

    const [data, total] = await Promise.all([
      this.model.findMany({
        where,
        skip,
        take,
        orderBy,
        select,
      }),
      this.model.count({ where }),
    ])

    return { count: total, items: data }
  }

  async update(id: string, dto: Partial<T>): Promise<T> {
    return this.model.update({
      where: { id },
      data: dto,
    })
  }

  async deleteManyByCondition(condition: object = {}): Promise<boolean> {
    await this.model.deleteMany({
      where: condition,
    })

    return true
  }

  async permanentlyDelete(id: string): Promise<boolean> {
    await this.model.delete({
      where: { id },
    })

    return true
  }
}
