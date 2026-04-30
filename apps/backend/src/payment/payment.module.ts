import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { ReservationsModule } from 'src/reservations/reservations.module';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [ReservationsModule, UsersModule],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}