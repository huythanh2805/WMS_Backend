import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpException,
  Logger,
  Post,
  Req,
  Res,
  UnauthorizedException,
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
  private readonly logger = new Logger(AuthController.name)
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}
  // Local login
  @Post("register")
  async register(@Body() dto: RegisterDto, @Res() res) {
    const tokens = await this.authService.register(dto)
    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày
    })
    return res.json({ accessToken: tokens.accessToken })
  }
  // Local login
  @Post("login")
  async login(@Body() dto: LoginDto, @Res() res) {
    const tokens = await this.authService.login(dto)
    const { refreshToken, isFirstTimeLogIn, accessToken } = tokens
    const isProduction = process.env.NODE_ENV === "production"
    const clintUrl = this.configService.get<string>("CLIENT_URL")
    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày
    })
    // Because Nextjs can't read cookie while they are in different domain
    // We have to redirect to frontend and give they setting cookie in frontend
    if (isProduction) {
      return res.redirect(
        `${clintUrl}/auth/callback?refreshToken=${refreshToken}&isFirstTimeLogIn=${isFirstTimeLogIn}`,
      )
    }
    return res.json({ accessToken })
  }
  @Get("logout")
  async logout(@Res() res) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
    })
    return res.json({ message: "Logged out successfully" })
  }

  // Refresh
  @Post("refresh")
  async refresh(@Req() req, @Res() res) {
    const httpRefreshToken = req.cookies.refreshToken
    this.logger.debug({ httpRefreshToken })
    if (!httpRefreshToken)
      throw new ForbiddenException("You must login in first")
    const tokens = await this.authService.refreshTokens(httpRefreshToken)
    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày
    })
    return res.json({ accessToken: tokens.accessToken })
  }

  // Google
  @Get("google")
  @UseGuards(AuthGuard("google"))
  googleLogin() { }

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

    const isProduction = process.env.NODE_ENV === "production"
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày
    })
    // Because Nextjs can't read cookie while they are in different domain
    // We have to redirect to frontend and give they setting cookie in frontend
    if (isProduction) {
      return res.redirect(
        `${clintUrl}/auth/callback?refreshToken=${refreshToken}&isFirstTimeLogIn=${isFirstTimeLogIn}`,
      )
    }
    const redirectUrl = isFirstTimeLogIn
      ? `${clintUrl}/onboarding`
      : `${clintUrl}/dashboard`
    return res.redirect(redirectUrl)
  }
}
