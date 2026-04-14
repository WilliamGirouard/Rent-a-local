import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { Role } from './roles/roles.enum';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository : Repository<User>,
    ) {}
    
    accessUsersRepo() : Repository<User>{
        return this.usersRepository
    }
    
    async findAllUsers() : Promise<User[]> {
        return this.usersRepository.find();
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
            throw new BadRequestException("Invalid email")
        }
        return foundUser;
    }

    async createUser(dto : CreateUserDto, hashedPassword : string) : Promise<User> {
        const newUser = this.usersRepository.create({
            email: dto.email,
            password: hashedPassword,
            firstName: dto.firstName,
            lastName: dto.lastName,
            role: Role.User
        });
        return await this.usersRepository.save(newUser);
    }

    async removeUser(id:number) : Promise<User> {
        const foundUser = await this.findOneUserById(id);
        return await this.usersRepository.remove(foundUser);
    }

    async updateUser(id:number, attrs : Partial<User>) : Promise<User> {
        const foundUser = await this.findOneUserById(id);
        Object.assign(foundUser, attrs);
        return this.usersRepository.save(foundUser);
    }
}