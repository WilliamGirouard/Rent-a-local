import { Controller, Post,Body,Get, Param, Delete, Patch, UseInterceptors, ClassSerializerInterceptor, SerializeOptions } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { DeleteUserDto } from 'src/dtos/delete-user.dto';
import { UpdateUserDto } from 'src/dtos/update-user.dto';
import { LoginUserDto } from 'src/dtos/login-user.dto';
import { Serialize, SerializeInterceptor } from 'src/interceptors/serialize.interceptor';
import { UserDto } from 'src/dtos/user.dto';

@Controller('users')
export class UsersController {
    constructor(private usersService : UsersService){}

    @Post("/signup")
    async createUser(@Body() body : CreateUserDto) {
        console.log(body);
        return await this.usersService.addUser(body.email, body.password, body.firstName, body.lastName);
    }

    // @UseInterceptors(ClassSerializerInterceptor)
    // @UseInterceptors(new SerializeInterceptor(UserDto))
    // @SerializeOptions({type: User})
    @Serialize(UserDto)
    @Get("/users")
    async getUsers() {
        console.log("Handler is running")
        return await this.usersService.findAllUsers();
    }

    // @UseInterceptors(ClassSerializerInterceptor)
    // @UseInterceptors(new SerializeInterceptor(UserDto))
    // @SerializeOptions({type: User})
    @Serialize(UserDto)
    @Get("/:id")
    async getUserById(@Param("id") id : number) {
        return await this.usersService.findOneUserById(id)
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
