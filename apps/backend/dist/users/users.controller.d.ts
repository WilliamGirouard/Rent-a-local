import { UsersService } from './users.service';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { DeleteUserDto } from 'src/dtos/delete-user.dto';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    createUser(body: CreateUserDto): Promise<import("./user.entity").User>;
    getUsers(): Promise<import("./user.entity").User[]>;
    getUserById(id: number): Promise<import("./user.entity").User[] | null>;
    deleteUser(body: DeleteUserDto): Promise<void>;
}
