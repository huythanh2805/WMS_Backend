import { PrismaService } from "src/prisma/prisma.service";
import { BaseRepositoryAbstract } from "./base/base.abstract.respository";
import { File } from "@prisma/client";
import { Injectable } from "@nestjs/common";
import { FileInterface } from "src/file/interfaces/file.interface";

@Injectable()
export class FileRepository extends BaseRepositoryAbstract<File> implements FileInterface {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma, prisma.file)
}
}