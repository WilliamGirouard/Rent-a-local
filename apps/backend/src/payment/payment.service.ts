import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ReservationsService } from 'src/reservations/reservations.service';
import { UsersService } from 'src/users/service/users.service';

export interface PaymentReceipt {
  reservationId: number;
  transactionId: string;
  amount: number;
  currency: string;
  paidAt: Date;
  status: 'approved';
}

@Injectable()
export class PaymentService {
  constructor(
    private reservationsService: ReservationsService,
    private usersService: UsersService,
  ) {}

  async payReservation(
    reservationId: number,
    currentUserId: number,
  ): Promise<PaymentReceipt> {
    const reservation =
      await this.reservationsService.findOne(reservationId);

    if (!reservation) {
      throw new NotFoundException('Reservation not found');
    }

    if (reservation.user.id !== currentUserId) {
      throw new BadRequestException(
        'You can only pay your own reservations',
      );
    }

    if (reservation.paid) {
      throw new BadRequestException(
        'This reservation has already been paid',
      );
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    const nights = Math.max(
      1,
      Math.ceil(
        (end.getTime() - start.getTime()) /
          (1000 * 60 * 60 * 24),
      ),
    );

    const amount = nights * reservation.local.pricePerDay;

    // Simulation d'un vrai paiement
    const paymentApproved = this.simulatePayment();

    if (!paymentApproved) {
      throw new BadRequestException(
        'Payment was declined by the issuer',
      );
    }

    await this.reservationsService.update(reservation.id, {
      paid: true,
    });

    return {
      reservationId: reservation.id,
      transactionId: this.generateTransactionId(),
      amount,
      currency: 'CAD',
      paidAt: new Date(),
      status: 'approved',
    };
  }

  private simulatePayment(): boolean {
    // 85% de réussite
    return Math.random() < 0.85;
  }

  private generateTransactionId(): string {
    return `PAY-${Math.random().toString(12).toUpperCase()}-${Date.now()}`;
  }
}