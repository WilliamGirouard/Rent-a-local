import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { HashingService } from 'src/hashing/hashing.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { LoginUserDto } from 'src/auth/dtos/login-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private hashingService: HashingService,
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async verifyAlreadyExistingEmail(email: string) {
    const alreadyExistingBool = await this.userService
      .accessUsersRepo()
      .existsBy({ email: email });
    if (alreadyExistingBool) {
      throw new ConflictException('Un compte utilise deja cet email.');
    }
  }

  async register(dto: CreateUserDto): Promise<User> {
    await this.verifyAlreadyExistingEmail(dto.email);
    const hashedPassword = await this.hashingService.passwordHasher(
      dto.password,
    );
    return await this.userService.createUser(dto, hashedPassword);
  }

  async login(user: LoginUserDto): Promise<{ access_token: string }> {
    const userVerified = await this.userService.findOneUserByEmail(user.email);
    if (userVerified == null) {
      throw new UnauthorizedException('Invalid credentials');
    }
    if (
      (await this.hashingService.compareHashToPassword(
        user.password,
        userVerified?.password,
      )) == false
    ) {
      throw new UnauthorizedException('Unauthorized connection');
    }
    const payload = {
      sub: userVerified.id,
      email: userVerified.email,
      role: userVerified.role,
    };
    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
