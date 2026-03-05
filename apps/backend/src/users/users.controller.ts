import { Body, Controller, Get, Post, Param, Patch, /*ClassSerializerInterceptor*/ UseInterceptors, Session, Delete, UseGuards} from '@nestjs/common';
import { UsersService } from './service/users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { updateUserDto } from './dtos/update-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './service/auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { User } from './users.entity';
import { AdminGuard } from './guards/admin.guard';


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
    //@UseInterceptors(CurrentUserInterceptor)
    whoami(@CurrentUser() user:User){
        //return this.service.findOne(session.userId)
        //return this.auth.whoAmI(user.userId)
        return user;
    }

    //@UseInterceptors(ClassSerializerInterceptor)
    //@UseInterceptors(new SerializeInterceptor(UserDto))
    @Serialize(UserDto)
    @Get('/:id')
    findUser(@Param('id') id:string){
        return this.service.findOne(parseInt(id))
    }

    @UseGuards(AdminGuard)
    @Get()
    findAllUsers(){
        return this.service.findAll()
    }
    
    @UseGuards(AdminGuard)
    @Delete("/:id")
    deleteUser(@Param("id") id:number){
        return this.service.deleteUser(id);
    }

    @Patch('/:id')
    updateUser(@Param('id') id:string, @Body() body:updateUserDto){
        return this.service.updateUser(parseInt(id), body)
    }
}
