import { File } from "@prisma/client";
import { BaseRepositoryInterface } from "src/respositories/base/base.interface.respository";

export interface FileInterface extends BaseRepositoryInterface<File> {
}