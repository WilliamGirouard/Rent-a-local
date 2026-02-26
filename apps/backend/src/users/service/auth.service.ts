import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';


const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {

    constructor(private usersService: UsersService) {}

    async signup (email: string, password: string){
        // 1. Check if email is used
        const users = await this.usersService.findAllUsersByEmail(email);
        if (users.length){
            throw new BadRequestException("Email in use");
        }
        
        // 2. Hash password

        // Another possible thing you could use is bcrypt ==> See William's branch
            // 2.1 Generate a salt
        const salt = randomBytes(8).toString("hex");
            // 2.2 Hash the salt and password
        const hash = (await scrypt(password, salt, 32))  as Buffer;
            // 2.3 result + salt into db
        const result = salt + "." + hash.toString("hex")
        // 3. Create new user
        const user = await this.usersService.create(email, result)
        // 4. Return new user
        return user;
    }

    async signin(email: string, password:string){
        // 1. Find user by email

        const [user] = await this.usersService.findAllUsersByEmail(email);
        if (!user){
            throw new NotFoundException("User not found")
        }
        // 1.1 Recup salt et hash
        const [salt, storedHash] = user.password.split(".")

        // 2 hash the salt and password together
        const hash = (await scrypt(password, salt, 32) as Buffer)
        // 3. Compare the hashed password with the stored hash
        if (hash.toString("hex")!== storedHash){
            throw new BadRequestException("Password does not match")
        }
        // 4. Return user
        return user
        
    }

    async whoAmI(userId: number){
        if(!userId){return {loggedIn: false, message: "logged out"}}

        const user = await this.usersService.findOne(userId)
        return user

    }
}
