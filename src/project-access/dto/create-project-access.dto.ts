import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { AccessLevel } from '@prisma/client';

export class CreateProjectAccessDto {
  @IsUUID()
  workspaceMemberId: string;

  @IsUUID()
  projectId: string;

  @IsOptional()
  @IsEnum(AccessLevel)
  accessLevel?: AccessLevel;
}