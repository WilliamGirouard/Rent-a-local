import { Reservation } from './reservations.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { LocalsService } from 'src/local/locals.service';
import { CreateReservationDto } from 'src/dtos/create-reservation.dto';
export declare class ReservationsService {
    private repo;
    private usersService;
    private localsService;
    constructor(repo: Repository<Reservation>, usersService: UsersService, localsService: LocalsService);
    create(dto: CreateReservationDto): Promise<Reservation>;
    findAll(): Promise<Reservation[]>;
    findOne(id: number): Promise<Reservation>;
    remove(id: number): Promise<Reservation>;
    update(id: number, attrs: Partial<Reservation>): Promise<Reservation>;
}
