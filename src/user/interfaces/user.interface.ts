import { User } from "@prisma/client";
import { BaseRepositoryInterface } from "src/respositories/base/base.interface.respository";

export interface UserInterface extends BaseRepositoryInterface<User> {
}