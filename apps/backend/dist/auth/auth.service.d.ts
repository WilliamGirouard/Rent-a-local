import { HashingService } from 'src/hashing/hashing.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { LoginUserDto } from 'src/dtos/login-user.dto';
import { UsersService } from 'src/users/users.service';
export declare class AuthService {
    private hashingService;
    private jwtService;
    private userService;
    constructor(hashingService: HashingService, jwtService: JwtService, userService: UsersService);
    verifyAlreadyExistingEmail(email: string): Promise<void>;
    register(user: CreateUserDto): Promise<User>;
    login(user: LoginUserDto): Promise<{
        access_token: string;
    }>;
}
