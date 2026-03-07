import { Comment } from "@prisma/client";
import { BaseRepositoryInterface } from "src/respositories/base/base.interface.respository";

export interface CommentInterface extends BaseRepositoryInterface<Comment> {
}