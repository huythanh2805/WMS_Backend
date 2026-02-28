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
  async refresh(@Req() req, @Res() res) {
    const httpRefreshToken = req.cookies.refreshToken
    const tokens = await this.authService.refreshTokens(httpRefreshToken)
    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      path: "/auth/refresh",
    })
    return res.json({ accessToken: tokens.accessToken })
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
    const googleLoginResult = await this.authService.googleLogin(
      req.user.email,
      req.user.name,
      req.user.picture,
    )
    const { refreshToken, isFirstTimeLogIn } = googleLoginResult
    const clintUrl = this.configService.get<string>("CLIENT_URL")
    const redirectUrl = isFirstTimeLogIn ? `${clintUrl}/set-up` : `${clintUrl}/dashboard`
    res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/auth/refresh",
      })
      .redirect(redirectUrl)
  }
}
