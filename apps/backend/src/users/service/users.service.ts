import { Injectable, Param } from '@nestjs/common';
import { User } from './../users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ){}

    create(email:string, password:string) {
        const user = this.usersRepository.create({email, password});
        return this.usersRepository.save(user);
    }

    async updateUser(id:number, attrs: Partial<User>){
        const user = await this.usersRepository.findOneBy({id});

        if (!user){return null}

        Object.assign(user, attrs);
        return this.usersRepository.update(id, attrs);
    }


    async findOne(@Param('id') id:number){
        const user = await this.usersRepository.findOneBy({id})
        
        if (!user){return null}
        return user
    }

    async findAll(){
        const users = await this.usersRepository.find()
        return users
    }

    async findAllUsersByEmail(email:string){
        return await this.usersRepository.findBy({email})
    }

    
}
