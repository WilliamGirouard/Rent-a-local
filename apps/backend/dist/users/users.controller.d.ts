import { UsersService } from './users.service';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { DeleteUserDto } from 'src/dtos/delete-user.dto';
import { UpdateUserDto } from 'src/dtos/update-user.dto';
import { LoginUserDto } from 'src/dtos/login-user.dto';
import { User } from './user.entity';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    createUser(body: CreateUserDto): Promise<User>;
    getUsers(): Promise<User[]>;
    getUserById(id: number): Promise<User[] | null>;
    deleteUser(body: DeleteUserDto): Promise<User>;
    updateUser(id: number, body: UpdateUserDto): Promise<User>;
    FakeLoginTest(body: LoginUserDto): Promise<boolean>;
}
