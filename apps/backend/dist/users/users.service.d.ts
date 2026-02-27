import { User } from './user.entity';
import { AuthService } from 'src/auth/auth.service';
export declare class UsersService {
    private authService;
    constructor(authService: AuthService);
    findAllUsers(): Promise<User[]>;
    findOneUserById(id: number): Promise<User>;
    findOneUserByEmail(email: string): Promise<User>;
    removeUser(id: number): Promise<User>;
    updateUser(id: number, attrs: Partial<User>): Promise<User>;
}
