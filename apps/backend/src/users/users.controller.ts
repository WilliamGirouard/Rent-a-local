import { Controller, Post,Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from 'src/dtos/create-user.dto';

@Controller('users')
export class UsersController {

    @Post("/signup")
    createUser(@Body() body : CreateUserDto) {
        console.log(body);
    }
}
