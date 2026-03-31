import { Local } from './locals.entity';
import { CreateLocalDto } from 'src/dtos/create-local.dto';
export declare class LocalFactory {
    static create(dto: CreateLocalDto): Local;
}
