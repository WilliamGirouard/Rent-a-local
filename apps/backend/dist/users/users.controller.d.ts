import { UsersService } from './service/users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { updateUserDto } from './dtos/update-user.dto';
import { AuthService } from './service/auth.service';
export declare class UsersController {
    private service;
    private auth;
    constructor(service: UsersService, auth: AuthService);
    createUser(body: CreateUserDto): Promise<import("./users.entity").User>;
    findUser(id: string): Promise<import("./users.entity").User | null>;
    findAllUsers(): Promise<import("./users.entity").User[]>;
    deleteUser(): void;
    updateUser(id: string, body: updateUserDto): Promise<import("typeorm").UpdateResult | null>;
}
