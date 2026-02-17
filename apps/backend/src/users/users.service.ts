import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository, InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository : Repository<User>,
    ) {}
    
    transformUserFormToUserEntity() {
        
    }
    addDataToUser(user : User) {
        if (user != null) {
            throw new Error("User is non-existent");
        }
        this.usersRepository.create(user);
    }
}
