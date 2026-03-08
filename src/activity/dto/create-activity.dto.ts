// src/activities/dto/create-activity.dto.ts

import { IsString, IsUUID, IsOptional, IsNotEmpty } from 'class-validator';
import { ActivityType } from '@prisma/client';

export class CreateActivityDto {
  @IsString()
  @IsNotEmpty({ message: 'Type của activity không được để trống' })
  type: ActivityType;

  @IsString()
  @IsNotEmpty({ message: 'Description không được để trống' })
  description: string;

  @IsUUID('all', { message: 'projectId phải là UUID hợp lệ' })
  projectId: string;

  @IsOptional()
  @IsUUID('all')
  userId?: string;

}