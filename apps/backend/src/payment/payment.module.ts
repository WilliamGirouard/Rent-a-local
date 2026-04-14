import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { ReservationsModule } from 'src/reservations/reservations.module';

@Module({
  imports: [ReservationsModule],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}