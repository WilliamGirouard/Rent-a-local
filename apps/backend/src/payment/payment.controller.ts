import { Controller, Post, Param } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ReservationDto } from 'src/dtos/reservation.dto';

@Controller('payments')
export class PaymentController {

    constructor(private paymentService: PaymentService) {}

    @Serialize(ReservationDto)
    @Post('/:reservationId')
    async pay(@Param('reservationId') reservationId: number) {
        return await this.paymentService.payReservation(reservationId);
    }
}