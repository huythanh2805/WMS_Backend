import { BaseRepositoryAbstract } from "src/respositories/base/base.abstract.respository";
import { BaseServiceInterface } from "./base.interface.service";
import { FindAllResponse } from "src/types/common.type";

export abstract class BaseAbstractService<T>
  implements BaseServiceInterface<T>
{
  constructor(
    protected readonly repository: BaseRepositoryAbstract<T>,
  ) {}

  async create(item: T | any): Promise<T> {
    return this.repository.create(item);
  }

  async update(id: number, item: Partial<T>): Promise<T> {
    return this.repository.update(id, item);
  }

  async remove(id: number): Promise<boolean> {
    return this.repository.softDelete(id);
  }

  async removeByCondition(filter: Partial<T>): Promise<boolean> {
    return this.repository.deleteManyByCondition(filter);
  }

  async findAll(
    filter: object = {},
    options: object = {},
  ): Promise<FindAllResponse<T>> {
    return this.repository.findAll(filter, options);
  }

  async findOne(id: number): Promise<T> {
    return this.repository.findOneById(id);
  }

  async findOneByCondition(filter: Partial<T>): Promise<T> {
    return this.repository.findOneByCondition(filter);
  }
}