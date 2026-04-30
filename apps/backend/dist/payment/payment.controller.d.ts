import { PaymentService } from './payment.service';
export declare class PaymentController {
    private paymentService;
    constructor(paymentService: PaymentService);
    pay(reservationId: number, userId: number): Promise<import("./payment.service").PaymentReceipt>;
}
