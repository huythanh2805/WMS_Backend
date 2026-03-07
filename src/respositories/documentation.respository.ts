import { PrismaService } from "src/prisma/prisma.service";
import { BaseRepositoryAbstract } from "./base/base.abstract.respository";
import { Documentation } from "@prisma/client";
import { Injectable } from "@nestjs/common";
import { DocumentationInterface } from "src/documentation/interfaces/documentation.interface";

@Injectable()
export class DocumentationRepository extends BaseRepositoryAbstract<Documentation> implements DocumentationInterface {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma, prisma.documentation)
}
}