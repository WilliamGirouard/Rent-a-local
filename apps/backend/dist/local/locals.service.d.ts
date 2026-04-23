import { Repository } from 'typeorm';
import { Local } from './locals.entity';
import { CreateLocalDto } from './dtos/create-local.dto';
import { UpdateLocalDto } from './dtos/update-local.dto';
export declare class LocalsService {
    private localsRepository;
    constructor(localsRepository: Repository<Local>);
    findAll(): Promise<Local[]>;
    findOne(id: number): Promise<Local>;
    create(dto: CreateLocalDto): Promise<Local>;
    update(id: number, dto: UpdateLocalDto): Promise<Local>;
    remove(id: number): Promise<Local>;
}
