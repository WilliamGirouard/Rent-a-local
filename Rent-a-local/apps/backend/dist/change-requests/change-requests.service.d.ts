import { Repository } from 'typeorm';
import { ChangeRequest } from './change-request.entity';
import { CreateChangeRequestDto } from './dtos/create-change-request.dto';
import { ReservationsService } from 'src/reservations/reservations.service';
import { UsersService } from 'src/users/users.service';
export declare class ChangeRequestsService {
    private repo;
    private reservationsService;
    private usersService;
    constructor(repo: Repository<ChangeRequest>, reservationsService: ReservationsService, usersService: UsersService);
    create(dto: CreateChangeRequestDto): Promise<ChangeRequest>;
    findAll(): Promise<ChangeRequest[]>;
    approve(id: number): Promise<ChangeRequest>;
    reject(id: number): Promise<ChangeRequest>;
}
