import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from 'src/dtos/create-reservation.dto';
import { UpdateReservationDto } from 'src/dtos/update-reservation.dto';
export declare class ReservationsController {
    private reservationsService;
    constructor(reservationsService: ReservationsService);
    findAll(): Promise<import("./reservations.entity").Reservation[]>;
    findOne(id: number): Promise<import("./reservations.entity").Reservation>;
    createReservation(body: CreateReservationDto): Promise<import("./reservations.entity").Reservation>;
    remove(id: number): Promise<import("./reservations.entity").Reservation>;
    update(id: number, body: UpdateReservationDto): Promise<import("./reservations.entity").Reservation>;
}
