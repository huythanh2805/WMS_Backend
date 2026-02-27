import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);
  // Config
  // app.useGlobalPipes(new ValidationPipe());
  app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    // forbidNonWhitelisted: true,
  }),
);
  // Config response and error handling
  // app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(process.env.PORT ?? 5000, () => {
    logger.debug(`Server is running on port ${process.env.PORT ?? 5000}`);
  });
  
}
bootstrap();
