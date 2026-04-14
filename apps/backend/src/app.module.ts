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
import { Local } from './local/locals.entity';
import { LocalsModule } from './local/locals.module';
import { PaymentModule } from './payment/payment.module';



@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [User, Reservation, Local],
        synchronize: true,
      }),
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
    LocalsModule,
    PaymentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}