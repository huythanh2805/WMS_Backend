import { IsString, IsUUID } from "class-validator";

export class CreateCommentDto {
  @IsString()
  content: string;

  @IsUUID()
  projectId: string;

  @IsUUID()
  userId: string;

  @IsUUID()
  taskId: string;
}