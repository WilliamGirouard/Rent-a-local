import { BadRequestException } from '@nestjs/common';
import { Local } from './locals.entity';
import { User } from 'src/users/user.entity';
import { CreateLocalDto } from 'src/dtos/create-local.dto';

export class LocalFactory {
    static create(dto: CreateLocalDto, owner: User): Local {
        const local = new Local();
        local.name = dto.name;
        local.address = dto.address;
        local.description = dto.description;
        local.pricePerDay = dto.pricePerDay;
        local.owner = owner;
        return local;
    }
}