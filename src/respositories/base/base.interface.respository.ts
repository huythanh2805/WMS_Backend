import { FindAllResponse } from "src/types/common.type"

export interface BaseRepositoryInterface<T> {
  create(dto: T | any): Promise<T>

  findOneById(id: number, projection?: string): Promise<T>

  findOneByCondition(condition?: object, projection?: string): Promise<T>

  findAll(condition: object, options?: object): Promise<FindAllResponse<T>>

  update(id: number, dto: Partial<T>): Promise<T>

  softDelete(id: number): Promise<boolean>

  deleteManyByCondition(
    condition?: object,
    projection?: string,
  ): Promise<boolean>

  permanentlyDelete(id: number): Promise<boolean>
}
