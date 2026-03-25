import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "src/dtos/create-user.dto";
import { HashingService } from "src/hashing/hashing.service";
import { User } from "./user.entity";
import { Role } from "./roles/roles.enum";

@Injectable()
export class UserFactory {
    constructor (private hashingService : HashingService) {}

    async createUser(dto : CreateUserDto, role: Role = Role.User) : Promise<User> {
        const newUser = new User();
        newUser.email = dto.email;
        newUser.firstName = dto.firstName;
        newUser.lastName = dto.lastName;
        newUser.password = await this.hashingService.passwordHasher(dto.password);
        newUser.role = role;
    
        return newUser;
    }
}