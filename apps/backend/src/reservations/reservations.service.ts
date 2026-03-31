import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from './reservations.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { CreateReservationDto } from 'src/dtos/create-reservation.dto';
import { ReservationFactory } from './reservation.factory';
import { LocalsService } from 'src/locals/locals.service';

@Injectable()
export class ReservationsService {

    constructor(
        @InjectRepository(Reservation)
        private repo: Repository<Reservation>,
        private usersService: UsersService,
        private localsService: LocalsService
    ){}

    async create(dto: CreateReservationDto) : Promise<Reservation> {
        const user = await this.usersService.findOneUserById(dto.userId);
        //const local = await this.localsService.findOne(dto.localId)

        const reservation = ReservationFactory.create(dto, user);

        return await this.repo.save(reservation);
    }

    async findAll() : Promise<Reservation[]> {
        return await this.repo.find({ relations: ['user'] });
    }

    async findOne(id: number) : Promise<Reservation> {
        const reservation = await this.repo.findOne({ where: { id }, relations: ["user"] });
        if (!reservation) {
            throw new BadRequestException("Réservation non trouvée.");
        }
        return reservation;
    }

    async remove(id: number) : Promise<Reservation> {
        const reservation = await this.findOne(id);
        return await this.repo.remove(reservation);
    }

    async update(id: number, attrs: Partial<Reservation>) : Promise<Reservation> {
        const reservation = await this.findOne(id);

        if(reservation.paid) {
            throw new BadRequestException("Impossible de modifier le statut de paiement d'une réservation");
        }

        const newStart = attrs.startDate ?? reservation.startDate;
        const newEnd = attrs.endDate ?? reservation.endDate;

        if (newEnd <= newStart) {
            throw new BadRequestException("Date de fin doit être après la date de début.");
        }

        Object.assign(reservation, attrs);

        return await this.repo.save(reservation);
    }
}
