import { LocalsService } from './locals.service';
import { CreateLocalDto } from 'src/local/dtos/create-local.dto';
import { UpdateLocalDto } from 'src/local/dtos/update-local.dto';
export declare class LocalsController {
    private readonly localsService;
    constructor(localsService: LocalsService);
    create(createLocalDto: CreateLocalDto): Promise<import("./locals.entity").Local>;
    findAll(): Promise<import("./locals.entity").Local[]>;
    findOne(id: string): Promise<import("./locals.entity").Local>;
    update(id: string, updateLocalDto: UpdateLocalDto): Promise<import("./locals.entity").Local>;
    remove(id: string): Promise<import("./locals.entity").Local>;
}
