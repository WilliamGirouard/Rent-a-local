import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../users/dtos/create-user.dto';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    accessUsersRepo(): Repository<User>;
    findAllUsers(): Promise<User[]>;
    findOneUserById(id: number): Promise<User>;
    findOneUserByEmail(email: string): Promise<User>;
    createUser(dto: CreateUserDto, hashedPassword: string): Promise<User>;
    removeUser(id: number): Promise<User>;
    updateUser(id: number, attrs: Partial<User>): Promise<User>;
}
