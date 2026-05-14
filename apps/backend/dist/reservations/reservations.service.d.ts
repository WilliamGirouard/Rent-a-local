import { Reservation } from './reservations.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { LocalsService } from 'src/local/locals.service';
import { CreateReservationDto } from 'src/reservations/dtos/create-reservation.dto';
export declare class ReservationsService {
    private repo;
    private usersService;
    private localsService;
    constructor(repo: Repository<Reservation>, usersService: UsersService, localsService: LocalsService);
    create(dto: CreateReservationDto): Promise<Reservation>;
    findAll(): Promise<Reservation[]>;
    findOne(id: number): Promise<Reservation>;
    findOneSecure(id: number, user: any): Promise<Reservation>;
    findByLocalId(localId: number, excludeReservationId: number): Promise<Reservation[]>;
    findAllForUser(userId: number): Promise<Reservation[]>;
    UserActiveReservationValidation(userId: number, reservationId: number): Promise<Reservation>;
    remove(id: number): Promise<void>;
    update(id: number, attrs: Partial<Reservation>): Promise<Reservation>;
    findAllForLocal(localId: number): Promise<{
        startDate: Date;
        endDate: Date;
    }[]>;
    private checkOverlap;
    setPaymentStatus(id: number, paid: boolean): Promise<Reservation>;
}
