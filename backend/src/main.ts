import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { rawBody: true });
  app.setGlobalPrefix('v1', {
    exclude: ['file', 'file/:key', 'paywall/webhook'],
  });
  app.enableCors({
    allowedHeaders: ['Content-Type', 'Authorization', 'device-hash'],
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  app.use(cookieParser());
  await app.listen(3000);
}

bootstrap();
