import { HashingService } from 'src/hashing/hashing.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { LoginUserDto } from 'src/dtos/login-user.dto';
import { UsersService } from 'src/users/users.service';
import { UserFactory } from 'src/users/user.factory';
export declare class AuthService {
    private hashingService;
    private jwtService;
    private userService;
    private userFactory;
    constructor(hashingService: HashingService, jwtService: JwtService, userService: UsersService, userFactory: UserFactory);
    verifyAlreadyExistingEmail(email: string): Promise<void>;
    register(dto: CreateUserDto): Promise<User>;
    login(user: LoginUserDto): Promise<{
        access_token: string;
    }>;
}
