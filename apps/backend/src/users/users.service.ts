import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
    constructor(
        private authService : AuthService,
       // private dataSource : DataSource, Plus pour database et se connecter genre Postegresql etc..
    ) {}
    
    // async addUser(email : string, password : string, firstName:string, lastName:string) : Promise<User> {
    //     await this.verifyAlreadyExistingEmail(email);
    //     const hashedPassword = await this.hashingService.passwordHasher(password);
    //     const user = this.usersRepository.create({email,password:hashedPassword,firstName,lastName});
    //     return await this.usersRepository.save(user);
    // }

    async findAllUsers() : Promise<User[]> {
        return this.authService.accessUsersRepo().find();
    }

    async findOneUserById(id : number) : Promise<User> {
        const foundUser = await this.authService.accessUsersRepo().findOneBy({id:id})
        if (foundUser == null) {
            throw new NotFoundException("Invalid Id")
        }
        return foundUser;
    }

    async findOneUserByEmail(email : string) : Promise<User> {
    const foundUser = await this.authService.accessUsersRepo().findOneBy({email:email})
    if (foundUser == null) {
        throw new BadRequestException("Invalid email")
    }
    return foundUser;
    }

    async removeUser(id:number) : Promise<User> {
        const foundUser = await this.findOneUserById(id);
        return await this.authService.accessUsersRepo().remove(foundUser);
    }

    async updateUser(id:number, attrs : Partial<User>)  {
        const foundUser = await this.findOneUserById(id);
        if (attrs == id)
        Object.assign(foundUser,attrs);
        return this.authService.accessUsersRepo().save(foundUser)
    }
}
