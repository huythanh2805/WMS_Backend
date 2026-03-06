import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator"

export class CreateWorkspaceDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsOptional()
  @IsString()
  description?: string

  @IsString()
  @IsNotEmpty()
  inviteCode: string

  @IsUUID()
  @IsOptional()
  ownerId?: string
}
