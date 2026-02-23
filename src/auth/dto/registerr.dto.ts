import { Optional } from '@nestjs/common'
import { IsEmail, IsString, MinLength } from 'class-validator'

export class RegisterDto {
  @IsEmail()
  email: string

  @IsString()
  @MinLength(6)
  password: string

  @IsString()
  @Optional()
  name: string
}