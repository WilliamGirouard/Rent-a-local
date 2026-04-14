import { LocalsService } from './locals.service';
import { CreateLocalDto } from 'src/dtos/create-local.dto';
import { UpdateLocalDto } from 'src/dtos/update-local.dto';
export declare class LocalsController {
    private localsService;
    constructor(localsService: LocalsService);
    findAll(): Promise<import("./locals.entity").Local[]>;
    findOne(id: number): Promise<import("./locals.entity").Local>;
    create(body: CreateLocalDto): Promise<import("./locals.entity").Local>;
    update(id: number, body: UpdateLocalDto): Promise<import("./locals.entity").Local>;
    remove(id: number): Promise<import("./locals.entity").Local>;
}
