import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { ReservationsService } from 'src/reservations/reservations.service';

@Injectable()
export class PaymentService {
    constructor(
        private reservationsService: ReservationsService
    ) {}

    async payReservation(reservationId: number) {
        const reservation = await this.reservationsService.findOne(reservationId);

        if (reservation.paid) {
            throw new BadRequestException("Reservation already paid");
        }

        // La carte Kiwi qui rend tout possible!
        const fakePaymentSuccess = true;

        if (!fakePaymentSuccess) {
            throw new BadRequestException("Payment failed");
        }

        reservation.paid = true;

        return await this.reservationsService.update(reservation.id, {
            paid: true,
        });
    }
}