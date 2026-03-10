import { AccessLevel } from "@prisma/client"
import { IsEmail, IsEnum, IsOptional, IsUUID } from "class-validator"

export class CreateInvitationDto {
  @IsEmail()
  email: string

  @IsEnum(AccessLevel)
  @IsOptional()
  accessLevel?: AccessLevel

  @IsUUID()
  workspaceId: string

  @IsUUID()
  @IsOptional()
  invitedById?: string
}
