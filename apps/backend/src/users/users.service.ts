import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { DataSource, IsNull, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository : Repository<User>,
       // private dataSource : DataSource, Plus pour database et se connecter genre Postegresql etc..
    ) {}

    async verifyAlreadyExistingEmail(email:string) {
        const alreadyExistingBool = await this.usersRepository.existsBy({email:email});
        if (alreadyExistingBool) {
            throw new Error("Un compte utilise deja cet email.")
        }
    }
    
    async addUser(email : string, password : string, firstName:string, lastName:string) : Promise<User> {
        this.verifyAlreadyExistingEmail(email);
        const user = new User();
        user.email = email; user.password = password; user.firstName = firstName; user.lastName = lastName;
        return await this.usersRepository.save(user);
    }

    async findAllUsers() : Promise<User[]> {
        return await this.usersRepository.find({
            select: {
                id:true,
                email:true,
                firstName:true,
                lastName:true,
            }
        });
    }

    async findOneUser(id : number) : Promise<User[] | null> {
        const foundUser = await this.usersRepository.find({
            select: {
                id:true,
                email:true,
                firstName:true,
                lastName:true,
            },
            where: {
                id:id
            }
        });
        if (foundUser == null) {
            throw new Error("L'utilisateur n'existe pas..")
        }
        return foundUser;
    }

    async removeUser(id:number) : Promise<void> {
        const userExistBool = await this.usersRepository.existsBy({id:id});
        if (!userExistBool) {
            throw new Error("User is non-existent you bad admin..")
        }
        await this.usersRepository.delete(id);
    }
}
