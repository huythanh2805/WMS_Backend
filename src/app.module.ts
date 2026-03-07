import { Module } from "@nestjs/common"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { PrismaModule } from "./prisma/prisma.module"
import { UserModule } from "./user/user.module"
import { PrismaService } from "./prisma/prisma.service"
import { AuthModule } from "./auth/auth.module"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { WorkspaceModule } from "./workspace/workspace.module"
import { ProjectModule } from "./project/project.module"
import { TaskModule } from "./task/task.module"
import { APP_INTERCEPTOR } from "@nestjs/core"
import { ResponseInterceptor } from "./common/interceptors/response.interceptor"
import { WorkspaceMemberModule } from "./workspace-member/workspace-member.module"
import { MailerModule } from "@nestjs-modules/mailer"
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { MailService } from './mail/mail.service';
import { join } from "path"
import { DocumentationModule } from './documentation/documentation.module';
import { CommentModule } from './comment/comment.module';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    AuthModule,
    ConfigModule.forRoot(),
    WorkspaceModule,
    ProjectModule,
    TaskModule,
    WorkspaceMemberModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get('MAIL_HOST'),  
          port: config.get('MAIL_PORT'),          
          secure: config.get('MAIL_SECURE') === 'true', 
          auth: {
            user: config.get('MAIL_USER'),
            pass: config.get('MAIL_PASS'),        
          },
        },
        defaults: {
          from: `"No Reply" <${config.get('MAIL_FROM')}>`,
        },
        template: {
         dir: join(process.cwd(), 'dist', 'templates'), 
          adapter: new PugAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
    DocumentationModule,
    CommentModule,
    FileModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    MailService,
  ],
})
export class AppModule {}
