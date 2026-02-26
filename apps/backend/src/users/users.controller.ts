import { Body, Controller, Get, Post, Param, Patch,/*, UseInterceptors, ClassSerializerInterceptor*/ 
UseInterceptors,
Session} from '@nestjs/common';
import { UsersService } from './service/users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { updateUserDto } from './dtos/update-user.dto';
import { Serialize, SerializeInterceptor } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './service/auth.service';

@Controller('auth')
export class UsersController {

    constructor(private service: UsersService, private auth: AuthService){}

    @Post("/signup")
    async createUser(@Body() body:CreateUserDto, @Session() session:any){
        //console.log(body)
        const user = await this.auth.signup(body.email, body.password)
        session.userId = user.id;
        return user
    }

    @Post("signin")
    async signin(@Body() body:CreateUserDto, @Session() session:any){
        const user = await this.auth.signin(body.email, body.password)
        session.userId = user.id;
        return user
    }

    @Post("signout")
    signout(@Session() session:any){
        session.userId = null
        return "Successfully logged out"
    }

    @Get("/whoami")
    whoami(@Session() session:any){
        //return this.service.findOne(session.userId)
        return this.auth.whoAmI(session.userId)
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
