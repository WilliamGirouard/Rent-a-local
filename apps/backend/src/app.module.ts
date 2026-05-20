import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { HashingModule } from './hashing/hashing.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ReservationsModule } from './reservations/reservations.module';
import { Reservation } from './reservations/reservations.entity';
import { Local } from './local/locals.entity';
import { LocalsModule } from './local/locals.module';
import { PaymentModule } from './payment/payment.module';
import { ContactModule } from './contact/contact.module';
import { MailerModule } from "@nestjs-modules/mailer"
import { ChangeRequestsModule } from './change-requests/change-requests.module';
import { ChangeRequest } from './change-requests/change-request.entity';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

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
        entities: [User, Reservation, Local, ChangeRequest],
        synchronize: true,
      }),
    }),
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: {
          service: "gmail",
          auth: {
            user: configService.get("GMAIL_MAIL"),
            pass: configService.get("GMAIL_PASS"),
          },
        },
        defaults : {
          from: `"Rent-a-local" <${configService.get("GMAIL_MAIL")}>`,
        },
      }),
    }),


    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
    }),

    UsersModule,
    HashingModule,
    AuthModule,
    ReservationsModule,
    LocalsModule,
    PaymentModule,
    ContactModule,
    ChangeRequestsModule,
    CloudinaryModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}