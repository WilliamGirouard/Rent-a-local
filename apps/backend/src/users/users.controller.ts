import { Body, Controller, Get, Post, Param, Patch,/*, UseInterceptors, ClassSerializerInterceptor*/ 
UseInterceptors} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { updateUserDto } from './dtos/update-user.dto';
import { Serialize, SerializeInterceptor } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';

@Controller('users')
export class UsersController {


    constructor(private service: UsersService){}

    @Post("/signup")
    createUser(@Body() body:CreateUserDto){
        //console.log(body)
        return this.service.create(body.email, body.password)
    }

    //@UseInterceptors(ClassSerializerInterceptor)
    //@UseInterceptors(new SerializeInterceptor(UserDto))
    @Serialize(UserDto)
    @Get('/:id')
    findUser(@Param('id') id:string){
        return this.service.findOne(parseInt(id))
    }

    @Get()
    findAllUsers(){
        return this.service.findAll()
    }

    deleteUser(){}

    @Patch('/:id')
    updateUser(@Param('id') id:string, @Body() body:updateUserDto){
        return this.service.updateUser(parseInt(id), body)
    }
}
