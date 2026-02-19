import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { updateUserDto } from './dtos/update-user.dto';
export declare class UsersController {
    private service;
    constructor(service: UsersService);
    createUser(body: CreateUserDto): Promise<import("./users.entity").User>;
    findAllUsers(): void;
    deleteUser(): void;
    updateUser(id: string, body: updateUserDto): Promise<import("typeorm").UpdateResult> | null;
}
