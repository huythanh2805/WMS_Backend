import { PrismaService } from "src/prisma/prisma.service";
import { BaseRepositoryAbstract } from "./base/base.abstract.respository";
import { Comment } from "@prisma/client";
import { Injectable } from "@nestjs/common";
import { CommentInterface } from "src/comment/interfaces/comment.interface";

@Injectable()
export class CommentRepository extends BaseRepositoryAbstract<Comment> implements CommentInterface {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma, prisma.comment)
}
}