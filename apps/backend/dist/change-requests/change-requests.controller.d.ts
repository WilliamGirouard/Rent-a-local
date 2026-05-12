import { ChangeRequestsService } from './change-requests.service';
import { CreateChangeRequestDto } from './dtos/create-change-request.dto';
export declare class ChangeRequestsController {
    private changeRequestsService;
    constructor(changeRequestsService: ChangeRequestsService);
    create(body: CreateChangeRequestDto): Promise<import("./change-request.entity").ChangeRequest>;
    findAll(): Promise<import("./change-request.entity").ChangeRequest[]>;
    approve(id: number): Promise<import("./change-request.entity").ChangeRequest>;
    reject(id: number): Promise<import("./change-request.entity").ChangeRequest>;
}
