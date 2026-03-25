import { CreateUserDto } from "src/dtos/create-user.dto";
import { HashingService } from "src/hashing/hashing.service";
import { User } from "./user.entity";
import { Role } from "./roles/roles.enum";
export declare class UserFactory {
    private hashingService;
    constructor(hashingService: HashingService);
    createUser(dto: CreateUserDto, role?: Role): Promise<User>;
}
