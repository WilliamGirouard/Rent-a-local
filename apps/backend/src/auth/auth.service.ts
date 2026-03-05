import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { HashingService } from 'src/hashing/hashing.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { LoginUserDto } from 'src/dtos/login-user.dto';
import { Role } from 'src/users/roles/roles.enum';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {

    constructor(
        private hashingService : HashingService,
        private jwtService : JwtService,
        private userService : UsersService,
    ){}

    async verifyAlreadyExistingEmail(email:string) {
        const alreadyExistingBool = await this.userService.accessUsersRepo().existsBy({email:email});
        if (alreadyExistingBool) {
            throw new ConflictException("Un compte utilise deja cet email.")
        }
    }

    
    async register(user : CreateUserDto) : Promise<User> {
        await this.verifyAlreadyExistingEmail(user.email);
        const hashedPassword = await this.hashingService.passwordHasher(user.password);
        const userWithHash = this.userService.accessUsersRepo().create(
            {
                email:user.email,
                password:hashedPassword,
                firstName:user.firstName,
                lastName:user.lastName,
                role:Role.User,
            });
        return await this.userService.accessUsersRepo().save(userWithHash);
    }

    async login(user : LoginUserDto): Promise<{access_token:string}> {
        const userVerified = await this.userService.accessUsersRepo().findOneBy({email:user.email});
        if(userVerified == null) {
            throw new UnauthorizedException("Invalid credentials")
        }
        if(await this.hashingService.compareHashToPassword(user.password, userVerified?.password) == false) {
            throw new UnauthorizedException("Unauthorized connection");
        }
        const payload = {sub: userVerified.id, email:userVerified.email};
        return {access_token: await this.jwtService.signAsync(payload)}
    }
    
}
