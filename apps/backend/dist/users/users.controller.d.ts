import { UsersService } from './users.service';
import { UpdateUserDto } from 'src/dtos/update-user.dto';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    listUsers(): Promise<import("./user.entity").User[]>;
    getUserById(id: number): Promise<import("./user.entity").User>;
    deleteUser(id: number): Promise<import("./user.entity").User>;
    updateUser(id: number, body: UpdateUserDto): Promise<import("./user.entity").User>;
}
