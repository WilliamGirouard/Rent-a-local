import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, //Supprime les proprietes non definies dans le DTO.
    forbidNonWhitelisted: true, // Lance une erreur quand il y a une propriete que l'on ne veut pas
    transform: true, // S'assure de bien transformer avec le class-transformer
  }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
