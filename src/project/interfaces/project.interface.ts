import { Project } from "@prisma/client";
import { BaseRepositoryInterface } from "src/respositories/base/base.interface.respository";

export interface ProjectInterface extends BaseRepositoryInterface<Project> {
}