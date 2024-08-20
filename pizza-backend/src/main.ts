import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1'); // Set /api/v1/ URL
  app.enableCors(); // Set Cross-origin resource sharing (CORS) On
  app.useGlobalInterceptors(new ResponseInterceptor());  // Use Interceptor
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT); // Set Port Number
}

bootstrap();