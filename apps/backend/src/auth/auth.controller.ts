import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { LoginUserDto } from 'src/dtos/login-user.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { currentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';

@Controller('auth')
export class AuthController {
    constructor(private authService : AuthService){}

    @HttpCode(HttpStatus.OK)
    @Post("/login")
    async login(@Body() body: LoginUserDto){
        return this.authService.login(body);
    }

    @HttpCode(HttpStatus.OK)
    @Post("/register")
    async register(@Body() body : CreateUserDto) {
        return this.authService.register(body)
    }

    @UseGuards(AuthGuard)
    @Get("/profile")
    getProfile(@currentUser() user : User){
        return user;
    }
}
