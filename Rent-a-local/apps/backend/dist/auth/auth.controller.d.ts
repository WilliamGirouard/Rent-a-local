import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { LoginUserDto } from 'src/auth/dtos/login-user.dto';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
export declare class AuthController {
    private authService;
    private userService;
    constructor(authService: AuthService, userService: UsersService);
    login(body: LoginUserDto): Promise<{
        access_token: string;
    }>;
    register(body: CreateUserDto): Promise<User>;
    getProfile(user: any): Promise<User>;
}
