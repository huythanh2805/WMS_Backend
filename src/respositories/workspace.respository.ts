import { PrismaService } from "src/prisma/prisma.service";
import { BaseRepositoryAbstract } from "./base/base.abstract.respository";
import { User, Workspace } from "@prisma/client";
import { UserInterface } from "src/user/interfaces/user.interface";
import { Injectable } from "@nestjs/common";
import { WorkspaceInterface } from "src/workspace/interfaces/workspace.interface";

@Injectable()
export class WorkspaceRepository extends BaseRepositoryAbstract<Workspace> implements WorkspaceInterface {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma, prisma.workspace)
}
}