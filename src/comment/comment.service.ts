import { HttpException, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { BaseAbstractService } from 'src/services/base/base.abstract.service';
import { Comment } from '@prisma/client';
import { CommentRepository } from 'src/respositories/comment.respository';
import { FindAllResponse } from 'src/types/common.type';

@Injectable()
export class CommentService extends BaseAbstractService<Comment> {
 constructor(private readonly commentRespository: CommentRepository){
  super(commentRespository)
 }
 async findLatestCommentsByProjectId(projectId: string): Promise<FindAllResponse<Comment>> {
    try {
        return this.commentRespository.findLatestCommentsByProjectId(projectId)
    } catch (error) {
        throw new HttpException("Find Latest Comment Error", 500)
    }
 }
}
