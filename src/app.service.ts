import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return {
      message: 'Welcome to the WMS API',
      version: '1.0.0',
      description: 'This is the Warehouse Management System API built with NestJS and Prisma.',
    }
  }
}
