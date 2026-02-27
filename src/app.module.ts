import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { WorkspaceModule } from './workspace/workspace.module';
import { ProjectModule } from './project/project.module';

@Module({
  imports: [PrismaModule, UserModule, AuthModule, ConfigModule.forRoot(), WorkspaceModule, ProjectModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
