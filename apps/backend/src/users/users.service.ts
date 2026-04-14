    import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
    import { User } from './user.entity';
    import { InjectRepository } from '@nestjs/typeorm';
    import { Repository } from 'typeorm';

    @Injectable()
    export class UsersService {
        constructor(
            @InjectRepository(User)
            private usersRepository : Repository<User>,
        // private dataSource : DataSource, Plus pour database et se connecter genre Postegresql etc..
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
