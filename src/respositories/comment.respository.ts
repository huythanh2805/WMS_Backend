import { PrismaService } from "src/prisma/prisma.service";
import { BaseRepositoryAbstract } from "./base/base.abstract.respository";
import { Comment } from "@prisma/client";
import { Injectable } from "@nestjs/common";
import { CommentInterface } from "src/comment/interfaces/comment.interface";
import { FindAllResponse } from "src/types/common.type";

@Injectable()
export class CommentRepository extends BaseRepositoryAbstract<Comment> implements CommentInterface {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma, prisma.comment)
}
 async create(dto: Comment ): Promise<Comment> {
    return this.prisma.comment.create({
      data: dto,
      include: {
        user: true
      }
    })
  }
  async findLatestCommentsByProjectId(projectId: string): Promise<FindAllResponse<Comment>> {
     const comments = await this.prisma.comment.findMany({
      where: {
        projectId
      },
      orderBy: {
        createdAt: "desc"
      },
      include: {
        task: true,
        user: true
      },
      take: 5,
     })
     return {
      count: comments.length,
      items: comments
     }
  }
}