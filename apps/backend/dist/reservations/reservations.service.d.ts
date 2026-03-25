import { Reservation } from './reservations.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { CreateReservationDto } from 'src/dtos/create-reservation.dto';
export declare class ReservationsService {
    private repo;
    private usersService;
    constructor(repo: Repository<Reservation>, usersService: UsersService);
    create(dto: CreateReservationDto): Promise<Reservation>;
    findAll(): Promise<Reservation[]>;
    findOne(id: number): Promise<Reservation>;
    remove(id: number): Promise<Reservation>;
    update(id: number, attrs: Partial<Reservation>): Promise<Reservation>;
}
