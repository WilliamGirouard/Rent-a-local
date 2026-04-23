import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { LoginUserDto } from 'src/dtos/login-user.dto';
import { User } from 'src/users/user.entity';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(body: LoginUserDto): Promise<{
        access_token: string;
    }>;
    register(body: CreateUserDto): Promise<User>;
    getProfile(user: User): User;
}
