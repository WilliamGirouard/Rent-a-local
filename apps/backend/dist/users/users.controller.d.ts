import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './user.entity';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    listUsers(): Promise<User[]>;
    getUserById(id: number): Promise<User>;
    deleteUser(id: number): Promise<User>;
    updateUser(id: number, body: UpdateUserDto): Promise<User>;
}
