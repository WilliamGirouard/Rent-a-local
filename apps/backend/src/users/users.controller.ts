import { Controller, Post,Body,Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { DeleteUserDto } from 'src/dtos/delete-user.dto';
@Controller('users')
export class UsersController {
    constructor(private usersService : UsersService){}

    @Post("/signup")
    async createUser(@Body() body : CreateUserDto) {
        console.log(body);
        return await this.usersService.addUser(body.email, body.password, body.firstName, body.lastName);
    }

    @Get("/users")
    async getUsers() {
        return await this.usersService.findAllUsers();
    }

    @Get("/:id")
    async getUserById(@Param("id") id : number) {
        return await this.usersService.findOneUser(id)
    }

    @Post("/deleteUser")
    async deleteUser(@Body() body : DeleteUserDto) {
        return await this.usersService.removeUser(body.id)
    }
}
