import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { BaseAbstractService } from 'src/services/base/base.abstract.service';
import { Comment } from '@prisma/client';
import { CommentRepository } from 'src/respositories/comment.respository';

@Injectable()
export class CommentService extends BaseAbstractService<Comment> {
 constructor(private readonly commentRespository: CommentRepository){
  super(commentRespository)
 }
}
