import { SetMetadata } from '@nestjs/common'
import { AccessLevel } from '@prisma/client'

export const ACCESS_KEY = 'access'
export const Access = (...access: AccessLevel[]) =>
  SetMetadata(ACCESS_KEY, access)