import { LocalsService } from './locals.service';
import { CreateLocalDto } from 'src/local/dtos/create-local.dto';
import { UpdateLocalDto } from 'src/local/dtos/update-local.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
export declare class LocalsController {
    private readonly localsService;
    private readonly cloudinaryService;
    constructor(localsService: LocalsService, cloudinaryService: CloudinaryService);
    create(createLocalDto: CreateLocalDto, files: Express.Multer.File[]): Promise<import("./locals.entity").Local>;
    findAll(): Promise<import("./locals.entity").Local[]>;
    findOne(id: string): Promise<import("./locals.entity").Local>;
    getReservations(id: string): Promise<{
        startDate: Date;
        endDate: Date;
    }[]>;
    update(id: string, updateLocalDto: UpdateLocalDto): Promise<import("./locals.entity").Local>;
    remove(id: string): Promise<import("./locals.entity").Local>;
}
