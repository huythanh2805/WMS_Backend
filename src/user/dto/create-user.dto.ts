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

  // @IsString()
  // @MinLength(6)
  // @MaxLength(50)
  // password: string

  // @IsOptional()
  // @IsString()
  // @Matches(/^(0|\+84)[0-9]{9}$/)
  // phone?: string

  // @IsOptional()
  // @IsString()
  // avatar?: string

  // @IsOptional()
  // @IsEnum(UserRole)
  // role?: UserRole

  // @IsOptional()
  // @IsBoolean()
  // isActive?: boolean
}
