import { UsersService } from './service/users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { updateUserDto } from './dtos/update-user.dto';
import { AuthService } from './service/auth.service';
export declare class UsersController {
    private service;
    private auth;
    constructor(service: UsersService, auth: AuthService);
    createUser(body: CreateUserDto, session: any): Promise<import("./users.entity").User>;
    signin(body: CreateUserDto, session: any): Promise<import("./users.entity").User>;
    signout(session: any): string;
    whoami(session: any): Promise<import("./users.entity").User | {
        loggedIn: boolean;
        message: string;
    }>;
    findUser(id: string): Promise<import("./users.entity").User>;
    findAllUsers(): Promise<import("./users.entity").User[]>;
    deleteUser(): void;
    updateUser(id: string, body: updateUserDto): Promise<import("typeorm").UpdateResult | null>;
}
