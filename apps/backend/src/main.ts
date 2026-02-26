import { NestFactory/*, Reflector*/ } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import cookieSession from 'cookie-session';

//const cookieSession = require("cookie-session")


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieSession({
    keys: ["MiaouSecretKey"],
  }))
  app.useGlobalPipes(new ValidationPipe(
    {
      whitelist: true, // DO NOT CARE ABOUT OTHER THAN WHAT'S NEEDED
      forbidNonWhitelisted: true, // ^^ CREATE AN ERROR FOR THOSE
      transform: true // S'ASSURE DE TRANSFORMER EN OBJET
    }
  ));
  //app.useGlobalInterceptors(
  //  new ClassSerializerInterceptor(app.get(Reflector))
  //)
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
