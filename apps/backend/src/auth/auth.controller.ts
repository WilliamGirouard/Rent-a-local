import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, Session, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { LoginUserDto } from 'src/dtos/login-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';

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
    getProfile(@Request() req){
        //Profile du user connecte
        return req.user;
    }

}
