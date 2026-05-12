import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChangeRequest } from './change-request.entity';
import { ChangeRequestStatus } from './status/status.enum';
import { CreateChangeRequestDto } from './dtos/create-change-request.dto';
import { ReservationsService } from 'src/reservations/reservations.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ChangeRequestsService {
    constructor(
        @InjectRepository(ChangeRequest)
        private repo: Repository<ChangeRequest>,
        private reservationsService: ReservationsService,
        private usersService: UsersService,
    ) {}

    async create(dto: CreateChangeRequestDto): Promise<ChangeRequest> {
        const reservation = await this.reservationsService.findOne(dto.reservationId);

        if (reservation.paid) {
            throw new BadRequestException('Impossible de demander un changement pour une réservation déjà payée.');
        }

        if (dto.newEndDate <= dto.newStartDate) {
            throw new BadRequestException('La date de fin doit être après la date de début.');
        }

        const existingRequest = await this.repo.findOne({
            where: {
                reservation: { id: dto.reservationId },
                status: ChangeRequestStatus.PENDING,
            },
        });

        if (existingRequest) {
            throw new BadRequestException('Une demande de changement est déjà en attente pour cette réservation.');
        }

        const conflicts = await this.reservationsService.findByLocalId(
            reservation.local.id,
            reservation.id,
        );

        for (const c of conflicts) {
            if (c.startDate < dto.newEndDate && c.endDate > dto.newStartDate) {
                throw new BadRequestException('Ces dates sont déjà réservées pour ce local.');
            }
        }

        const user = await this.usersService.findOneUserById(dto.userId);

        const changeRequest = new ChangeRequest();
        changeRequest.newStartDate = dto.newStartDate;
        changeRequest.newEndDate = dto.newEndDate;
        changeRequest.reservation = reservation;
        changeRequest.user = user;

        return await this.repo.save(changeRequest);
    }

    async findAll(): Promise<ChangeRequest[]> {
        return await this.repo.find({
            where: { status: ChangeRequestStatus.PENDING },
            relations: ['reservation', 'user', 'reservation.local'],
        });
    }

    async approve(id: number): Promise<ChangeRequest> {
        const changeRequest = await this.repo.findOne({
            where: { id },
            relations: ['reservation'],
        });

        if (!changeRequest) {
            throw new NotFoundException('Change request non trouvé.');
        }

        if (changeRequest.status !== ChangeRequestStatus.PENDING) {
            throw new BadRequestException('Cette demande a déjà été traitée.');
        }

        await this.reservationsService.update(changeRequest.reservation.id, {
            startDate: changeRequest.newStartDate,
            endDate: changeRequest.newEndDate,
        });

        changeRequest.status = ChangeRequestStatus.APPROVED;
        return await this.repo.save(changeRequest);
    }

    async reject(id: number): Promise<ChangeRequest> {
        const changeRequest = await this.repo.findOne({ where: { id } });

        if (!changeRequest) {
            throw new NotFoundException('Change request non trouvé.');
        }

        if (changeRequest.status !== ChangeRequestStatus.PENDING) {
            throw new BadRequestException('Cette demande a déjà été traitée.');
        }

        changeRequest.status = ChangeRequestStatus.REJECTED;
        return await this.repo.save(changeRequest);
    }
}