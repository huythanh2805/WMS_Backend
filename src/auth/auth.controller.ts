import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common"
import { AuthService } from "./auth.service"
import { AuthGuard } from "@nestjs/passport"
import { LoginDto } from "./dto/login.dto"
import { RefreshDto } from "./dto/refresh.dto"
import { RegisterDto } from "./dto/registerr.dto"

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Local login
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto)
  }
  // Local login
  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto)
  }

  // Refresh
  @Post('refresh')
  async refresh(@Body() dto: RefreshDto) {
    return this.authService.refreshTokens(
      dto.userId,
      dto.refreshToken,
    )
  }

  // Google
  // @Get('google')
  // @UseGuards(AuthGuard('google'))
  // googleLogin() {}

  // @Get('google/callback')
  // @UseGuards(AuthGuard('google'))
  // async googleCallback(@Req() req) {
  //   const user = await this.authService.findOrCreateGoogleUser(req.user)

  //   const tokens = await this.authService.generateTokens(
  //     user.id,
  //     user.email,
  //   )

  //   await this.authService.updateRefreshToken(
  //     user.id,
  //     tokens.refreshToken,
  //   )

  //   return tokens
  // }
}