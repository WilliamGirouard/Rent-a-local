import { Injectable } from '@nestjs/common';
import { User } from './users.entity';
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

    updateUser(id:number, attrs: Partial<User>){
        const user = this.usersRepository.findOneBy({id});

        if (!user){return null}

        Object.assign(user, attrs);
        return this.usersRepository.update(id, attrs);
    }

    
}
