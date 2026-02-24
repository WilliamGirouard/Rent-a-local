import { Controller, Post,Body,Get, Param, Delete, Patch, UseInterceptors, ClassSerializerInterceptor, SerializeOptions } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { DeleteUserDto } from 'src/dtos/delete-user.dto';
import { UpdateUserDto } from 'src/dtos/update-user.dto';
import { LoginUserDto } from 'src/dtos/login-user.dto';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
    constructor(private usersService : UsersService){}

    @Post("/signup")
    async createUser(@Body() body : CreateUserDto) {
        console.log(body);
        return await this.usersService.addUser(body.email, body.password, body.firstName, body.lastName);
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @SerializeOptions({type: User})
    @Get("/users")
    async getUsers() {
        return await this.usersService.findAllUsers();
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @SerializeOptions({type: User})
    @Get("/:id")
    async getUserById(@Param("id") id : number) {
        return await this.usersService.findOneUser(id)
    }

    @Delete("/deleteUser")
    async deleteUser(@Body() body : DeleteUserDto) {
        return await this.usersService.removeUser(body.id)
    }
    @Patch("/update/:id")
    async updateUser(@Param("id") id: number, @Body() body : UpdateUserDto) {
        return await this.usersService.updateUser(id, body)
    }

    @Post("/login")
    async FakeLoginTest(@Body() body : LoginUserDto) : Promise<boolean> {
        return await this.usersService.FakeLoginTest(body.email, body.password);
    }

}
