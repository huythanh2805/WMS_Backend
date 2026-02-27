import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
  IsEnum,
  Matches,
  IsBoolean,
} from "class-validator"
import { Transform } from "class-transformer"

export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase())
  email: string

  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name: string

  @IsOptional()
  @IsString()
  about?: string | null

  @IsOptional()
  @IsString()
  industryType?: string | null

  @IsOptional()
  @IsString()
  roleType?: string | null

  @IsOptional()
  @IsString()
  country?: string | null

  @IsOptional()
  @IsString()
  image?: string | null

  @IsOptional()
  @IsBoolean()
  onboardingCompleted?: boolean
}
