import { Module } from '@nestjs/common';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ReservationsModule } from 'src/reservations/reservations.module';
@Module({
  imports: [MailerModule, ReservationsModule],
  controllers: [ContactController],
  providers: [ContactService]
})
export class ContactModule {}
