import { Task } from "@prisma/client";
import { BaseRepositoryInterface } from "src/respositories/base/base.interface.respository";

export interface TaskInterface extends BaseRepositoryInterface<Task> {
}