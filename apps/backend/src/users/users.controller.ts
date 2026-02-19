import { Body, Controller, Get, Post, Param, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { updateUserDto } from './dtos/update-user.dto';
@Controller('users')
export class UsersController {


    constructor(private service: UsersService){}

    @Post("/signup")
    createUser(@Body() body:CreateUserDto){
        //console.log(body)
        return this.service.create(body.email, body.password)
    }

    findAllUsers(){}

    deleteUser(){}

    @Patch('/:id')
    updateUser(@Param('id') id:string, @Body() body:updateUserDto){
        return this.service.updateUser(parseInt(id), body)
    }
}
