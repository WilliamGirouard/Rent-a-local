import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, //Supprime les proprietes non definies dans le DTO.
    forbidNonWhitelisted: true, // Lance une erreur quand il y a une propriete que l'on ne veut pas
    transform: true, // S'assure de bien transformer avec le class-transformer
  }));
  app.enableCors({
  origin: process.env.FRONTEND_ORIGIN || [
    'http://localhost:5173',
    'http://localhost:5175',
  ], // Allow specific origin
  credentials: true, // Allow cookies or auth headers
});
  app.setGlobalPrefix("/v1");
  // app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
