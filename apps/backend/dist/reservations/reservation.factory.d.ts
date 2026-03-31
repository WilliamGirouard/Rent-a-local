import { Reservation } from './reservations.entity';
import { User } from '../users/user.entity';
import { CreateReservationDto } from '../dtos/create-reservation.dto';
export declare class ReservationFactory {
    static create(dto: CreateReservationDto, user: User): Reservation;
}
