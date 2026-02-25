import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HashingService } from 'src/hashing/hashing.service';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository : Repository<User>,
        private hashingService : HashingService,
       // private dataSource : DataSource, Plus pour database et se connecter genre Postegresql etc..
    ) {}

    async verifyAlreadyExistingEmail(email:string) {
        if (await this.usersRepository.existsBy({email:email})) {
            throw new ConflictException("Un compte utilise deja cet email.")
        }
    }
    
    async addUser(email : string, password : string, firstName:string, lastName:string) : Promise<User> {
        await this.verifyAlreadyExistingEmail(email);
        const hashedPassword = await this.hashingService.passwordHasher(password);
        const user = this.usersRepository.create({email,password:hashedPassword,firstName,lastName});
        return await this.usersRepository.save(user);
    }

    async findAllUsers() : Promise<User[]> {
        return await this.usersRepository.find();
    }

    async FakeLoginTest(email:string, password:string) : Promise<boolean> {
        const foundUser = await this.findOneUserByEmail(email);
        return await this.hashingService.compareHashToPassword(password, foundUser.password);
    }

    async findOneUserById(id : number) : Promise<User> {
        const foundUser = await this.usersRepository.findOneBy({id:id})
        if (foundUser == null) {
            throw new NotFoundException("Invalid Id")
        }
        return foundUser;
    }

    async findOneUserByEmail(email : string) : Promise<User> {
    const foundUser = await this.usersRepository.findOneBy({email:email})
    if (foundUser == null) {
        throw new NotFoundException("Invalid email")
    }
    return foundUser;
    }

    async removeUser(id:number) : Promise<User> {
        const foundUser = await this.findOneUserById(id);
        return await this.usersRepository.remove(foundUser);
    }

    async updateUser(id:number, attrs : Partial<User>)  {
        const foundUser = await this.findOneUserById(id);
        if (attrs == id)
        Object.assign(foundUser,attrs);
        return this.usersRepository.save(foundUser)
    }
}
