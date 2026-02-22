import { PrismaService } from 'src/prisma/prisma.service'
import { FindAllResponse } from 'src/types/common.type'
import { BaseRepositoryInterface } from './base.interface.respository'

export abstract class BaseRepositoryAbstract<T>
  implements BaseRepositoryInterface<T>
{
  constructor(
    protected readonly prisma: PrismaService,
    protected readonly model: any, // Prisma delegate (e.g prisma.user)
  ) {}

  async create(dto: T | any): Promise<T> {
    return this.model.create({
      data: dto,
    })
  }

  async findOneById(id: number, projection?: any): Promise<T> {
    return this.model.findFirst({
      where: {
        id,
        deletedAt: null,
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
        deletedAt: null,
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
      deletedAt: null,
    }

    const [data , total] = await Promise.all([
      this.model.findMany({
        where,
        skip,
        take,
        orderBy,
        select,
      }),
      this.model.count({ where }),
    ])

    return { items: data, count:total }
  }

  async update(id: number, dto: Partial<T>): Promise<T> {
    return this.model.update({
      where: { id },
      data: dto,
    })
  }

  async softDelete(id: number): Promise<boolean> {
    await this.model.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    })

    return true
  }

  async deleteManyByCondition(
    condition: object = {},
  ): Promise<boolean> {
    await this.model.deleteMany({
      where: condition,
    })

    return true
  }

  async permanentlyDelete(id: number): Promise<boolean> {
    await this.model.delete({
      where: { id },
    })

    return true
  }
}