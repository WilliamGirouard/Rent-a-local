import { User } from './user.entity';
import { Repository } from 'typeorm';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    transformUserFormToUserEntity(): void;
    addDataToUser(user: User): void;
}
