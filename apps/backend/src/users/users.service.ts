import { Injectable, NotFoundException } from '@nestjs/common';
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
        const alreadyExistingBool = await this.usersRepository.existsBy({email:email});
        if (alreadyExistingBool) {
            throw new Error("Un compte utilise deja cet email.")
        }
    }
    
    async addUser(email : string, password : string, firstName:string, lastName:string) : Promise<User> {
        this.verifyAlreadyExistingEmail(email);
        const hashedPassword = await this.hashingService.passwordHasher(password);
        const user = this.usersRepository.create({email,password:hashedPassword,firstName,lastName});
        return await this.usersRepository.save(user);
    }

    async findAllUsers() : Promise<User[]> {
        return await this.usersRepository.find();
    }

    async FakeLoginTest(email:string, password:string) : Promise<boolean> {
        let getEmailAccountHash = (await this.usersRepository.findBy({email:email})).at(0)?.password
        if (getEmailAccountHash == undefined) {
            getEmailAccountHash = "undefined";
        }
        return await this.hashingService.compareHashToPassword(password, getEmailAccountHash);
    }

    //Manual serialization (Double security ?)
//     async findAllUsers() : Promise<User[]> {
//     return await this.usersRepository.find({
//         select: {
//             id:true,
//             email:true,
//             firstName:true,
//             lastName:true,
//         },
//     }
//     );
// }

    async findOneUser(id : number) : Promise<User | null> {
        const foundUser = await this.usersRepository.findOneBy({id})
        if (foundUser == null) {
            throw new NotFoundException("L'utilisateur n'existe pas..")
        }
        return foundUser;
    }
    // async findOneUser(id : number) : Promise<User[] | null> {
    //    const foundUser = await this.usersRepository.find({
    //      select: {
    //         id:true,
    //         email:true,
    //         firstName:true,
    //         lastName:true,
    //     },
    //      where: {
    //             id:id
    //         }
    //     });
    //     if (foundUser == null) {
    //         throw new Error("L'utilisateur n'existe pas..")
    //     }
    //     return foundUser;
    // }
    async removeUser(id:number) : Promise<User> {
        const user = await this.usersRepository.findOneBy({id});
        if (!user) {
            throw new NotFoundException("User is non-existent")
        }
        return await this.usersRepository.remove(user);
    }

    async updateUser(id:number, attrs : Partial<User>)  {
        const user = await this.usersRepository.findOneBy({id});
        if (!user) {
            throw new NotFoundException("User is non-existent")
        }
        if (attrs == id)
        Object.assign(user,attrs);
        return this.usersRepository.save(user)
    }
}
