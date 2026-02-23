import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule } from '@nestjs/config'

import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'

import { JwtStrategy } from './strategies/jwt.strategy'
import { RefreshTokenStrategy } from './strategies/refresh.strategy'
import { GoogleStrategy } from './strategies/google.strategy'

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    RefreshTokenStrategy,
    GoogleStrategy,
  ],
})
export class AuthModule {}