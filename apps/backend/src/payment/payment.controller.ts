import {
  Controller,
  Post,
  Param,
  UseGuards,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { currentUser } from 'src/users/decorators/current-user.decorator'; 
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('payments')
export class PaymentController {
  constructor(
    private paymentService: PaymentService,
  ) {}

  @Post('/:reservationId')
  @UseGuards(AuthGuard)
  async pay(
    @Param('reservationId') reservationId: string,
    @currentUser() user: any,
  ) {
    return this.paymentService.payReservation(
      Number(reservationId),
      user.sub,
    );
  }
}