import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from "@nestjs/common"
import { RegisterDto } from "./dto/registerr.dto"
import { LoginDto } from "./dto/login.dto"
import { JwtService } from "@nestjs/jwt"
import { PrismaService } from "src/prisma/prisma.service"
import * as bcrypt from "bcrypt"

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}
  // ================= REGISTER =================
  async register(
    dto: RegisterDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    })

    if (existingUser) {
      throw new BadRequestException("Email already exists")
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10)

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        name: dto.name,
      },
    })

    const tokens = await this.generateTokens(user.id, user.email)

    await this.updateRefreshToken(user.id, tokens.refreshToken)

    return { ...tokens }
  }

  // ================= LOGIN =================
  async login(
    dto: LoginDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    })

    if (!user) {
      throw new ForbiddenException("Invalid credentials")
    }
    if(!user.password) {
      throw new ForbiddenException("Account has been registered with Google")
    }
    const isMatch = await bcrypt.compare(dto.password, user.password)

    if (!isMatch) {
      throw new ForbiddenException("Invalid credentials")
    }

    const tokens = await this.generateTokens(user.id, user.email)

    await this.updateRefreshToken(user.id, tokens.refreshToken)

    return { ...tokens }
  }

  async googleLogin(
    email: string,
    name: string,
    picture?: string,
  ): Promise<{ accessToken: string; refreshToken: string; isFirstTimeLogIn: boolean }> {
    let isFirstTimeLogIn: boolean = false
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    })

    if (!existingUser) {
      isFirstTimeLogIn = true
      const user = await this.prisma.user.create({
        data: {
          email,
          name,
          image: picture,
        },
      })

      const tokens = await this.generateTokens(user.id, user.email)

      await this.updateRefreshToken(user.id, tokens.refreshToken)

      return { ...tokens, isFirstTimeLogIn }
    } else {
      const tokens = await this.generateTokens(
        existingUser.id,
        existingUser.email,
      )

      await this.updateRefreshToken(existingUser.id, tokens.refreshToken)

      return { ...tokens, isFirstTimeLogIn: false }
    }
  }

  // ================= Refresh token =================
  async refreshTokens(
    refreshToken: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const payload = this.jwtService.verify(refreshToken, {
      secret: process.env.JWT_REFRESH_SECRET,
    })
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    })
    if (!user) throw new ForbiddenException()
    const isMatch = await bcrypt.compare(refreshToken, user.refreshToken)

    if (!isMatch) throw new ForbiddenException()

    const tokens = await this.generateTokens(user.id, user.email)

    await this.updateRefreshToken(user.id, tokens.refreshToken)

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    }
  }
  // ================= Generate token =================
  async generateTokens(
    userId: string,
    email: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const payload = { sub: userId, email }

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: "30s",
    })

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: "7d",
    })

    return { accessToken, refreshToken }
  }

  // ================= Update refresh token =================
  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashed = await bcrypt.hash(refreshToken, 10)

    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken: hashed },
    })
  }
}
