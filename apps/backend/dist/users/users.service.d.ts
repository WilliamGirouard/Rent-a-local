import { User } from './user.entity';
import { Repository } from 'typeorm';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    verifyAlreadyExistingEmail(email: string): Promise<void>;
    addUser(email: string, password: string, firstName: string, lastName: string): Promise<User>;
    findAllUsers(): Promise<User[]>;
    findOneUser(id: number): Promise<User[] | null>;
    removeUser(id: number): Promise<void>;
}
