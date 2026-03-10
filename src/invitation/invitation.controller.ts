import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from "@nestjs/common"
import { CreateInvitationDto } from "./dto/create-invitation.dto"
import { UpdateInvitationDto } from "./dto/update-invitation.dto"
import { JwtAuthGuard } from "src/auth/guards/jwt.guard"
import { InvitationService } from "./invitation.service"
import { VerifyInvitationDto } from "./dto/verify-invitation.dto"

@UseGuards(JwtAuthGuard)
@Controller("invitation")
export class InvitationController {
  constructor(private readonly InvitationService: InvitationService) {}

  @Post("/send")
  sendInvitation(@Body() createInvitationDto: CreateInvitationDto, @Req() req) {
    const userId = req.user.userId
    return this.InvitationService.createInvitationAndSendEmail({
      ...createInvitationDto,
      invitedById: userId,
    })
  }
  @Post("/verify")
  verifyToken(@Body() createInvitationDto: VerifyInvitationDto, @Req() req) {
    const currentUserEmail = req.user.email
    const currentUserId = req.user.userId
    return this.InvitationService.verifyToken(createInvitationDto, currentUserId, currentUserEmail)
}
  @Post()
  create(@Body() createInvitationDto: CreateInvitationDto) {
    return this.InvitationService.create(createInvitationDto)
  }

  @Get()
  findAll() {
    return this.InvitationService.findAll()
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.InvitationService.findOne(id)
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateInvitationDto: UpdateInvitationDto,
  ) {
    return this.InvitationService.update(id, updateInvitationDto)
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.InvitationService.remove(id)
  }
}
