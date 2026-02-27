import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { LoginUserDto } from 'src/dtos/login-user.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(body: LoginUserDto, session: any): Promise<{
        message: string;
        token: any;
    }>;
    register(body: CreateUserDto): Promise<import("../users/user.entity").User>;
    getProfile(req: any): any;
}
