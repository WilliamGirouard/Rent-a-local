import { Controller, Post,Body,Get, Param, Delete, Patch, UseInterceptors, ClassSerializerInterceptor, SerializeOptions } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from 'src/dtos/update-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from 'src/dtos/user.dto';

@Controller('users')
export class UsersController {

    constructor(private usersService : UsersService){}

    // @UseInterceptors(ClassSerializerInterceptor)
    // @UseInterceptors(new SerializeInterceptor(UserDto))
    // @SerializeOptions({type: User})
    @Serialize(UserDto)
    @Get()
    async listUsers() {
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

    @Delete("/:id")
    async deleteUser(@Param("id") id : number) {
        return await this.usersService.removeUser(id)
    }

    @Patch("/:id")
    async updateUser(@Param("id") id: number, @Body() body : UpdateUserDto) {
        return await this.usersService.updateUser(id, body)
    }
}
