import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { Logger, ValidationPipe } from "@nestjs/common"
import { HttpExceptionFilter } from "./common/filters/http-exception.filter"
import { ConfigService } from "@nestjs/config"
import * as cookieParser from 'cookie-parser';
async function bootstrap() {
  const logger = new Logger("Bootstrap")
  const app = await NestFactory.create(AppModule)
  const config = new ConfigService()
  // Config
  // app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser())
  app.enableCors({
    origin: config.get("CLIENT_URL"),
    credentials: true,
  })
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      // forbidNonWhitelisted: true,
    }),
  )
  // Config response and error handling
  app.useGlobalFilters(new HttpExceptionFilter())

  await app.listen(process.env.PORT ?? 5000, () => {
    logger.debug(`Server is running on port ${process.env.PORT ?? 5000}`)
  })
}
bootstrap()
