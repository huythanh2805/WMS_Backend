import { User, Workspace } from "@prisma/client";
import { BaseRepositoryInterface } from "src/respositories/base/base.interface.respository";

export interface WorkspaceInterface extends BaseRepositoryInterface<Workspace> {
}