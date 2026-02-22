import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  
  await app.listen(process.env.PORT ?? 5000, () => {
    logger.debug(`Server is running on port ${process.env.PORT ?? 5000}`);
  });
  
}
bootstrap();
