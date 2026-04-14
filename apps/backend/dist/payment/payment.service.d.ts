import { ReservationsService } from 'src/reservations/reservations.service';
export declare class PaymentService {
    private reservationsService;
    constructor(reservationsService: ReservationsService);
    payReservation(reservationId: number): Promise<import("../reservations/reservations.entity").Reservation>;
}
