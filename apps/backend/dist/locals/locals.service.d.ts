import { Local } from './locals.entity';
import { Repository } from 'typeorm';
import { CreateLocalDto } from 'src/dtos/create-local.dto';
export declare class LocalsService {
    private repo;
    constructor(repo: Repository<Local>);
    create(dto: CreateLocalDto): Promise<Local>;
    findAll(): Promise<Local[]>;
    findOne(id: number): Promise<Local>;
    remove(id: number): Promise<Local>;
    update(id: number, attrs: Partial<Local>): Promise<Local>;
}
