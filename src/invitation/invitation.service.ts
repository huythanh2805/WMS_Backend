import { HttpException, Injectable } from "@nestjs/common"
import { CreateInvitationDto } from "./dto/create-invitation.dto"
import { UpdateInvitationDto } from "./dto/update-invitation.dto"
import { BaseAbstractService } from "src/services/base/base.abstract.service"
import { Invitation } from "@prisma/client"
import { InvitationRepository } from "src/respositories/invitation.respository"
import { MailService } from "src/mail/mail.service"
import { UserRepository } from "src/respositories/user.respository"
import { VerifyInvitationDto } from "./dto/verify-invitation.dto"

@Injectable()
export class InvitationService extends BaseAbstractService<Invitation> {
  constructor(
    private readonly invitationRespository: InvitationRepository,
    private readonly mailService: MailService,
    private readonly userRespository: UserRepository,
  ) {
    super(invitationRespository)
  }
  async createInvitationAndSendEmail(
    createDto: CreateInvitationDto,
  ): Promise<Invitation> {
    try {
      const invitingUser = await this.userRespository.findOneById(
        createDto.invitedById as string,
      )
      const invitation =
        await this.invitationRespository.createInvitation(createDto)
      const invitationUrl = `${process.env.CLIENT_URL}/verify/invitation?token=${invitation.token}`
      if (invitingUser) {
        this.mailService.sendMailWithTemplate({
          from: invitingUser.name as string,
          to: createDto.email,
          link: invitationUrl,
        })
      }
      return invitation
    } catch (error) {
      console.log({error})
      throw new HttpException(error.response.message, 500)
    }
  }

  async verifyToken (verifyDto: VerifyInvitationDto,currentUserId: string , currentUserEmail: string) {
    try {
      await this.invitationRespository.acceptInvitation(verifyDto.token, currentUserId , currentUserEmail)
    } catch (error) {
      throw new HttpException(error.response.message, 500)
    }
  }
}
