import { PaymentService } from './payment.service';
export declare class PaymentController {
    private paymentService;
    constructor(paymentService: PaymentService);
    pay(reservationId: string, user: any): Promise<import("./payment.service").PaymentReceipt>;
}
