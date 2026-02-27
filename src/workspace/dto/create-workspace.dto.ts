import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateWorkspaceDto {
@IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
  
  @IsString()
  @IsNotEmpty()
  ownerId: string;
  
  @IsString()
  @IsNotEmpty()
  inviteCode: string;
}
