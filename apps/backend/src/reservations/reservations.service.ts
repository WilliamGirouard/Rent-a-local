import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from './reservations.entity';
import { Not, Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { LocalsService } from 'src/local/locals.service';
import { CreateReservationDto } from 'src/reservations/dtos/create-reservation.dto';
import { ReservationFactory } from './reservation.factory';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private repo: Repository<Reservation>,
    private usersService: UsersService,
    private localsService: LocalsService,
  ) {}

  async create(dto: CreateReservationDto): Promise<Reservation> {
    const { startDate, endDate, userId, localId } = dto;

    if (endDate <= startDate) {
      throw new BadRequestException(
        'Date de fin doit être après la date de début.',
      );
    }

    const user = await this.usersService.findOneUserById(userId);
    const local = await this.localsService.findOne(localId);

    //plus aumoins nécésaire vu que jai ajouter le conflict mais une barrirer sup 
    if (local.isReserved) {     // Vérification de la disponibilité du local avant de reserv
      throw new BadRequestException('Local déjà réservé pour ces dates.');
    }

    const conflict =  await this.repo.find({where: {local: { id: localId },}
    });

    for (const c of conflict) {
      if (c.startDate < endDate && c.endDate > startDate) {
        throw new BadRequestException('Local déjà réservé pour ces dates.');
      }
    }

    const reservation = ReservationFactory.create(dto, user, local);

    await this.checkOverlap(localId, new Date(startDate), new Date(endDate));
    return await this.repo.save(reservation);
  }

  async findAll(): Promise<Reservation[]> {
    return await this.repo.find({
      relations: ['user', 'local'],
    });
  }

  async findOne(id: number): Promise<Reservation> {
    const reservation = await this.repo.findOne({
      where: { id },
      relations: ['user', 'local'],
    });

    if (!reservation) {
      throw new BadRequestException('Réservation non trouvée.');
    }

    return reservation;
  }

  async findOneSecure(id: number, user: any): Promise<Reservation> {
  const reservation = await this.repo.findOne({
    where: { id },
    relations: ['user', 'local'],
  });

  if (!reservation) {
    throw new NotFoundException('Réservation non trouvée.');
  }

  const isOwner = reservation.user.id === user.sub;
  const isAdmin = user.role === 'administrator';

  if (!isOwner && !isAdmin) {
    throw new ForbiddenException(
      "Vous n'avez pas accès à cette réservation.",
    );
  }

  return reservation;
}

  async findAllForUser(userId : number): Promise<Reservation[]> {
    return this.repo.find({
      where: {
        user: { id: userId},
      },
      relations: ['local', 'user'],
      order: {
        startDate: 'DESC',
      },
    });
  }
  async UserActiveReservationValidation(userId: number, reservationId: number) {
    const currentDate = new Date();

    const reservation = await this.repo.findOne({
      where: {
        id : reservationId,
        userId: userId,
      },
    });

    if (!reservation) {
      throw new NotFoundException("Reservation not found");
    }
    if (reservation.endDate < currentDate) {
      throw new BadRequestException("Reservation is expired.");
    }
    return reservation;
  }
  async remove(id: number): Promise<Reservation> {
    const reservation = await this.findOne(id);
    if (reservation.paid) {
      throw new BadRequestException(
        'Impossible de supprimer une réservation déjà payée.',
      );
    }
    return await this.repo.remove(reservation);
  }

  async update(id: number, attrs: Partial<Reservation>): Promise<Reservation> {
    const reservation = await this.findOne(id);

    if (reservation.paid) {
      throw new BadRequestException(
        'Impossible de modifier une réservation déjà payée.',
      );
    }
    const newStart = attrs.startDate ?? reservation.startDate;
    const newEnd = attrs.endDate ?? reservation.endDate;

    if (newEnd <= newStart) {
    throw new BadRequestException(
    'Date de fin doit être après la date de début.',);
    }

    const conflict =  await this.repo.find({where: {local: { id: reservation.localId },
        id: Not(reservation.id),}
    });

    for (const c of conflict) {
      if (c.startDate < newEnd && c.endDate > newStart) {
          throw new BadRequestException('Local déjà réservé pour ces dates.');
      }
    }

    Object.assign(reservation, attrs);

    await this.checkOverlap(reservation.local.id, new Date(newStart), new Date(newEnd), id);

    return await this.repo.save(reservation);
  }

  async findAllForLocal(localId: number): Promise<{ startDate: Date; endDate: Date }[]> {
    const reservations = await this.repo.find({
      where: { local: { id: localId } },
      relations: ['local'],
      select: ['startDate', 'endDate'],
    });
  return reservations;
  }

  private async checkOverlap(
    localId: number,
    startDate: Date,
    endDate: Date,
    excludeId?: number,
  ): Promise<void> {
    const query = this.repo
      .createQueryBuilder('r')
      .innerJoin('r.local', 'local')
      .where('local.id = :localId', { localId })
      .andWhere('r.paid = :paid', { paid: true })
      .andWhere('r.startDate < :endDate', { endDate })
      .andWhere('r.endDate > :startDate', { startDate });

    if (excludeId) {
      query.andWhere('r.id != :excludeId', { excludeId });
    }

    const overlapping = await query.getOne();

    if (overlapping) {
      throw new BadRequestException(
        'Ce local est déjà réservé pour ces dates.',
      );
    }
  }
}
