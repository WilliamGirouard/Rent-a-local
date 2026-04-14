import { PaymentService } from './payment.service';
export declare class PaymentController {
    private paymentService;
    constructor(paymentService: PaymentService);
    pay(reservationId: number): Promise<import("../reservations/reservations.entity").Reservation>;
}
