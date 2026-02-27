import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common"
import { AuthService } from "./auth.service"
import { AuthGuard } from "@nestjs/passport"
import { LoginDto } from "./dto/login.dto"
import { RefreshDto } from "./dto/refresh.dto"
import { RegisterDto } from "./dto/registerr.dto"
import { ConfigService } from "@nestjs/config"
import { AllowRefreshToken } from "src/decorators/allow-refresh-token.decorator"

@AllowRefreshToken()
@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  // Local login
  @Post("register")
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto)
  }
  // Local login
  @Post("login")
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto)
  }

  // Refresh
  @Post("refresh")
  async refresh(@Body() dto: RefreshDto) {
    return this.authService.refreshTokens(dto.userId, dto.refreshToken)
  }

  // Google
  @Get("google")
  @UseGuards(AuthGuard("google"))
  googleLogin() {
    console.log("Initiating Google login")
  }

  @Get("google/callback")
  @UseGuards(AuthGuard("google"))
  async googleCallback(@Req() req, @Res() res) {
    console.log("Google user:", req.user)

    const tokens = await this.authService.googleLogin(
      req.user.email,
      req.user.name,
      req.user.picture,
    )

    res.cookie("accessToken", tokens.accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    })

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    })

    return res.redirect(this.configService.get("CLIENT_URL") || "http://localhost:3000" )
  }
}
