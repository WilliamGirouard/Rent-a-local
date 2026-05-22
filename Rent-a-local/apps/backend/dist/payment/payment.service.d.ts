import { ReservationsService } from 'src/reservations/reservations.service';
import { UsersService } from 'src/users/users.service';
export interface PaymentReceipt {
    reservationId: number;
    transactionId: string;
    amount: number;
    currency: string;
    paidAt: Date;
    status: 'approved';
}
export declare class PaymentService {
    private reservationsService;
    private usersService;
    constructor(reservationsService: ReservationsService, usersService: UsersService);
    payReservation(reservationId: number, currentUserId: number): Promise<PaymentReceipt>;
    private simulatePayment;
    private generateTransactionId;
}
