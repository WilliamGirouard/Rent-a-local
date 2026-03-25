import { Reservation } from './reservations.entity';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from 'src/dtos/create-reservation.dto';
import { UpdateReservationDto } from 'src/dtos/update-reservation.dto';
export declare class ReservationsController {
    private reservationsService;
    constructor(reservationsService: ReservationsService);
    findAll(): Promise<Reservation[]>;
    findOne(id: number): Promise<Reservation>;
    createReservation(body: CreateReservationDto): Promise<Reservation>;
    remove(id: number): Promise<Reservation>;
    update(id: number, body: UpdateReservationDto): Promise<Reservation>;
}
