import { User } from './../users.entity';
import { Repository } from 'typeorm';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    create(email: string, password: string): Promise<User>;
    updateUser(id: number, attrs: Partial<User>): Promise<import("typeorm").UpdateResult | null>;
    findOne(id: number): Promise<User | null>;
    findAll(): Promise<User[]>;
    findAllUsersByEmail(email: string): Promise<User[]>;
}
