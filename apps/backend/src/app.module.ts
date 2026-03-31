import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReportsModule } from './reports/reports.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { HashingModule } from './hashing/hashing.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { NestCookieSessionOptions, CookieSessionModule,} from 'nestjs-cookie-session';
import { LocalsModule } from './locals/locals.module';
import { Local } from './locals/locals.entity';
import { ReservationsModule } from './reservations/reservations.module';
import { Reservation } from './reservations/reservations.entity';
@Module({
  imports: [TypeOrmModule.forRoot(
    {
      type: "sqlite",
      database: "db.sqlite",
      entities: [User, Reservation, Local],
      synchronize: true,
    }
),ConfigModule.forRoot( 
  {
    envFilePath: ".env",
    isGlobal:true,
  }
),CookieSessionModule.forRootAsync(
  {
    inject:[ConfigService],
    useFactory: async (configService: ConfigService) : Promise<NestCookieSessionOptions> => {
      return {
        session: {
          secret: configService.getOrThrow("COOKIE_SECRET"),
          httpOnly: true, // Peut pas être accèder par JS (Empêche des attaques XSS - Cross-site Scripting)
          //sameSite:"Lax",  (Protège des attaques CSRF)
          //secure:true, Envoie le cookie session seulement sur HTTPS
          maxAge: Number(configService.getOrThrow("COOKIE_EXPIRES")),// Temps d'expiration du cookie
         }
      }
    }
  }
  ),UsersModule, ReportsModule, HashingModule, AuthModule, ReservationsModule, LocalsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
