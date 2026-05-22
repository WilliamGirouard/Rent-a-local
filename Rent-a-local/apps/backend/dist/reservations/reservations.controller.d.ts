import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from 'src/reservations/dtos/create-reservation.dto';
import { UpdateReservationDto } from 'src/reservations/dtos/update-reservation.dto';
import { UpdateReservationPaymentDto } from './dtos/update-reservation-payment.dto';
export declare class ReservationsController {
    private reservationsService;
    constructor(reservationsService: ReservationsService);
    findAll(): Promise<import("./reservations.entity").Reservation[]>;
    findMyReservations(user: any): Promise<import("./reservations.entity").Reservation[]>;
    findOne(id: number, user: any): Promise<import("./reservations.entity").Reservation>;
    createReservation(body: CreateReservationDto): Promise<import("./reservations.entity").Reservation>;
    remove(id: number): Promise<void>;
    update(id: number, body: UpdateReservationDto): Promise<import("./reservations.entity").Reservation>;
    setPaymentStatus(id: string, body: UpdateReservationPaymentDto): Promise<import("./reservations.entity").Reservation>;
}
