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
import { NestCookieSessionOptions, CookieSessionModule } from 'nestjs-cookie-session';
import { ReservationsModule } from './reservations/reservations.module';
import { Reservation } from './reservations/reservations.entity';
import { LocalModule } from './local/local.module';
import { Local } from './local/locals.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'rental_db',
      entities: [User, Reservation, Local],
      synchronize: true,
    }),
    
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
    }),
    
    CookieSessionModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService): Promise<NestCookieSessionOptions> => {
        return {
          session: {
            secret: configService.getOrThrow("COOKIE_SECRET"),
            httpOnly: true,
            maxAge: Number(configService.getOrThrow("COOKIE_EXPIRES")),
          }
        }
      }
    }),
    
    UsersModule,
    ReportsModule,
    HashingModule,
    AuthModule,
    ReservationsModule,
    LocalModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}