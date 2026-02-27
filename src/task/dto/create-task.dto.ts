import { TaskPriority, TaskStatus } from "@prisma/client";
import { Type } from "class-transformer";
import { IsDateString, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateTaskDto {
      @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsEnum(TaskPriority)
  priority?: TaskPriority;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @Type(() => Number)
  @IsInt()
  position: number;

  // Nếu dùng UUID thì đổi thành @IsUUID()
  @IsUUID()
  @IsNotEmpty()
  projectId: string;

  @IsOptional()
  @IsString()
  assigneeId?: string;
}
