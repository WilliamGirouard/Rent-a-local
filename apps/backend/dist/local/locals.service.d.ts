import { Repository } from 'typeorm';
import { Local } from './locals.entity';
import { Reservation } from 'src/reservations/reservations.entity';
import { CreateLocalDto } from './dtos/create-local.dto';
import { UpdateLocalDto } from './dtos/update-local.dto';
export declare class LocalsService {
    private localsRepository;
    private reservationsRepository;
    constructor(localsRepository: Repository<Local>, reservationsRepository: Repository<Reservation>);
    findAll(): Promise<Local[]>;
    findOne(id: number): Promise<Local>;
    findReservationsForLocal(localId: number): Promise<{
        startDate: Date;
        endDate: Date;
    }[]>;
    create(dto: CreateLocalDto): Promise<Local>;
    update(id: number, dto: UpdateLocalDto): Promise<Local>;
    remove(id: number): Promise<Local>;
}
