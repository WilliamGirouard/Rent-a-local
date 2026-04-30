import {
  Controller,
  Post,
  Param,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { currentUser } from 'src/users/decorators/current-user.decorator'; 

@Controller('payments')
export class PaymentController {
  constructor(
    private paymentService: PaymentService,
  ) {}

  @Post('/:reservationId')
  async pay(
    @Param('reservationId') reservationId: string,
    @currentUser() user: any,
  ) {
    return this.paymentService.payReservation(
      Number(reservationId),
      user.id,
    );
  }
}