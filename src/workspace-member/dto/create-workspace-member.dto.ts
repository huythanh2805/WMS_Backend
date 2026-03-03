import { AccessLevel } from "@prisma/client"
import { IsEnum, IsOptional, IsUUID } from "class-validator"

export class CreateWorkspaceMemberDto {
  @IsUUID()
  userId: string        

  @IsUUID()
  workspaceId: string

  @IsOptional()
  @IsEnum(AccessLevel)
  accessLevel?: AccessLevel
}
