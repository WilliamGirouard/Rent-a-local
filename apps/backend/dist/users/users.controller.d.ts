import { UsersService } from './service/users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { updateUserDto } from './dtos/update-user.dto';
import { AuthService } from './service/auth.service';
import { User } from './users.entity';
export declare class UsersController {
    private service;
    private auth;
    constructor(service: UsersService, auth: AuthService);
    createUser(body: CreateUserDto, session: any): Promise<User>;
    signin(body: CreateUserDto, session: any): Promise<User>;
    signout(session: any): string;
    whoami(user: User): User;
    findUser(id: string): Promise<User>;
    findAllUsers(): Promise<User[]>;
    updateUser(id: string, body: updateUserDto): Promise<import("typeorm").UpdateResult | null>;
}
