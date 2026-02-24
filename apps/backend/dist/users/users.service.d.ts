import { User } from './user.entity';
import { Repository } from 'typeorm';
import { HashingService } from 'src/hashing/hashing.service';
export declare class UsersService {
    private usersRepository;
    private hashingService;
    constructor(usersRepository: Repository<User>, hashingService: HashingService);
    verifyAlreadyExistingEmail(email: string): Promise<void>;
    addUser(email: string, password: string, firstName: string, lastName: string): Promise<User>;
    findAllUsers(): Promise<User[]>;
    FakeLoginTest(email: string, password: string): Promise<boolean>;
    findOneUser(id: number): Promise<User[] | null>;
    removeUser(id: number): Promise<User>;
    updateUser(id: number, attrs: Partial<User>): Promise<User>;
}
