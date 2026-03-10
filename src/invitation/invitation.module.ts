import { Module } from "@nestjs/common"
import { InvitationService } from "./invitation.service"
import { InvitationRepository } from "src/respositories/invitation.respository"
import { MailService } from "src/mail/mail.service"
import { UserRepository } from "src/respositories/user.respository"
import { InvitationController } from "./invitation.controller"

@Module({
  controllers: [InvitationController],
  providers: [
    InvitationService,
    InvitationRepository,
    MailService,
    UserRepository,
  ],
})
export class InvitationModule {}
