import { IsOptional, IsString, IsUUID } from "class-validator";

export class CreateDocumentationDto {
  @IsString()
  content: string;

  @IsUUID()
  projectId: string;

  @IsUUID()
  taskId: string;

  @IsOptional()
  @IsUUID()
  updatedBy?: string;
}