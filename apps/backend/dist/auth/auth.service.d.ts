import { HashingService } from 'src/hashing/hashing.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { LoginUserDto } from 'src/dtos/login-user.dto';
export declare class AuthService {
    private hashingService;
    private jwtService;
    private usersRepository;
    constructor(hashingService: HashingService, jwtService: JwtService, usersRepository: Repository<User>);
    verifyAlreadyExistingEmail(email: string): Promise<void>;
    accessUsersRepo(): Repository<User>;
    register(user: CreateUserDto): Promise<User>;
    login(user: LoginUserDto): Promise<{
        access_token: string;
    }>;
}
