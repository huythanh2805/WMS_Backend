import { SetMetadata } from '@nestjs/common';

export const AllowRefreshToken = () =>
  SetMetadata('allowRefreshToken', true);