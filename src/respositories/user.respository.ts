import { PrismaService } from "src/prisma/prisma.service";
import { BaseRepositoryAbstract } from "./base/base.abstract.respository";
import { User } from "@prisma/client";
import { UserInterface } from "src/user/interfaces/user.interface";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserRepository extends BaseRepositoryAbstract<User> implements UserInterface {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma, prisma.user)
}
}