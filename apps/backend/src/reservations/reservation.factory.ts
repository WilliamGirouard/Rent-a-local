import { Reservation } from './reservations.entity';
import { User } from '../users/user.entity';
import { CreateReservationDto } from '../dtos/create-reservation.dto';
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';

export class ReservationFactory {
    static create(dto: CreateReservationDto, user: User): Reservation {
        if (dto.endDate <= dto.startDate) {
            throw new BadRequestException("Date de fin doit être après la date de début.");
        }
        const reservation = new Reservation();
        reservation.startDate = dto.startDate;
        reservation.endDate = dto.endDate;
        reservation.paid = false;
        reservation.user = user;
        return reservation;
    }
}