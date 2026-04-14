import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, Session, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { LoginUserDto } from 'src/dtos/login-user.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { currentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { AdminGuard } from 'src/auth/guards/admin.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService : AuthService){}

    @HttpCode(HttpStatus.OK)
    @Post("/login")
    async login(@Body() body: LoginUserDto, @Session() session : any){
        const token = await this.authService.login(body)
        session.token = token;
        return {message : "Login Successful"};
    }

    @HttpCode(HttpStatus.OK)
    @Post("/register")
    async register(@Body() body : CreateUserDto) {
        return this.authService.register(body)
    }

    @UseGuards(AuthGuard)
    @Get("/profile")
    getProfile(@currentUser() user : User){
        //Profile du user connecte
        return user;
    }
}
