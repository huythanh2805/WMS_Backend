import { IsEnum, IsOptional, IsString, IsUUID } from "class-validator";
import { FileType } from "@prisma/client";

export class CreateFileDto {
  @IsString()
  name: string;

  @IsString()
  url: string;

  @IsOptional()
  @IsUUID()
  taskId?: string;

  @IsOptional()
  @IsUUID()
  projectId?: string;

  @IsEnum(FileType)
  type: FileType;
}