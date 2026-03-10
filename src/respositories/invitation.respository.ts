import { PrismaService } from "src/prisma/prisma.service"
import { BaseRepositoryAbstract } from "./base/base.abstract.respository"
import { Invitation } from "@prisma/client"
import {
  Injectable,
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from "@nestjs/common"
import { InvitationInterface } from "src/invitation/interfaces/invitation.interface"
import { CreateInvitationDto } from "src/invitation/dto/create-invitation.dto"
import { randomBytes } from "crypto"

@Injectable()
export class InvitationRepository
  extends BaseRepositoryAbstract<Invitation>
  implements InvitationInterface
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma, prisma.invitation)
  }

  async createInvitation(createDto: CreateInvitationDto): Promise<Invitation> {
    const { invitedById, email, workspaceId, accessLevel } = createDto

    // 1 kiểm tra user đã là member chưa
    const user = await this.prisma.user.findUnique({
      where: { email },
    })

    if (user) {
      const member = await this.prisma.workspaceMember.findFirst({
        where: {
          AND: [{ userId: user.id }, { workspaceId: workspaceId }],
        },
      })

      if (member) {
        throw new BadRequestException("User already in workspace")
      }
    }

    // 2 kiểm tra invitation pending
    const existingInvitation = await this.prisma.invitation.findFirst({
      where: {
        email,
        workspaceId,
        status: "PENDING",
      },
    })

    if (existingInvitation) {
      throw new BadRequestException("Invitation already sent")
    }

    // 3 generate token
    const token = randomBytes(32).toString("hex")

    // 4 tạo invitation
    const invitation = await this.prisma.invitation.create({
      data: {
        email,
        workspaceId,
        invitedById,
        accessLevel,
        token,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
      },
    })

    return invitation
  }
  async verifyInvitationToken(token: string) {
    const invitation = await this.prisma.invitation.findUnique({
      where: { token },
    })

    if (!invitation) {
      throw new Error("Invalid invitation token")
    }

    if (invitation.status !== "PENDING") {
      throw new Error("Invitation already used")
    }

    if (invitation.expiresAt < new Date()) {
      throw new Error("Invitation expired")
    }

    return invitation
  }

  async acceptInvitation(
    token: string,
    currentUserId: string,
    currentUserEmail: string,
  ) {
    const invitation = await this.verifyInvitationToken(token)
    const { email } = invitation
    if (email !== currentUserEmail)
      throw new ForbiddenException("You're not user who was invited")
    const invitedUser = await this.prisma.user.findFirst({
      where: {
        email,
      },
    })
    if (!invitedUser)
      throw new NotFoundException("You must sign in before join this workspace")
    const member = await this.prisma.workspaceMember.create({
      data: {
        workspaceId: invitation.workspaceId,
        userId: invitedUser?.id,
        accessLevel: invitation.accessLevel,
      },
    })

    await this.prisma.invitation.update({
      where: { id: invitation.id },
      data: { status: "ACCEPTED" },
    })

    return member
  }
}
