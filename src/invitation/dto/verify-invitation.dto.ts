import { AccessLevel } from "@prisma/client"
import { IsString } from "class-validator"

export class VerifyInvitationDto {
  @IsString()
  token: string
}
