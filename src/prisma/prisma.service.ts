import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from "@nestjs/common"
import { PrismaClient } from "@prisma/client"

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  logger = new Logger(PrismaService.name)

  async onModuleInit() {
    await this.$connect()
    this.logger.debug("Connected to the database")
  }

  async onModuleDestroy() {
    await this.$disconnect()
     this.logger.error("Disconnected from the database")
  }
}
