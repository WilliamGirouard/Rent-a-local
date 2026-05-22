import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { LoginUserDto } from 'src/auth/dtos/login-user.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { currentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from 'src/users/dtos/user.dto';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, 
    private userService : UsersService) {}

  @Post('/login')
  async login(@Body() body: LoginUserDto) {
    return this.authService.login(body);
  }

  @Post('/register')
  async register(@Body() body: CreateUserDto) {
    return this.authService.register(body);
  }

  @Serialize(UserDto)
  @UseGuards(AuthGuard)
  @Get('/profile')
  getProfile(@currentUser() user: any) {
    return this.userService.findOneUserById(user.sub);
  }
}
