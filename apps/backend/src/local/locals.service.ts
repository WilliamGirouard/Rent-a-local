import { Injectable, NotFoundException } from '@nestjs/common';
import { Local } from './locals.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLocalDto } from 'src/dtos/create-local.dto';
import { UpdateLocalDto } from 'src/dtos/update-local.dto';
import { LocalBuilder } from './locals.builder';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class LocalsService {
    constructor(
        @InjectRepository(Local)
        private localsRepository: Repository<Local>,
        private usersService: UsersService,
    ) {}

    async findAll(): Promise<Local[]> {
        return this.localsRepository.find();
    }

    async findOne(id: number): Promise<Local> {
        const local = await this.localsRepository.findOneBy({ id });
        if (!local) {
            throw new NotFoundException(`Local with ID ${id} not found`);
        }
        return local;
    }

    async create(dto: CreateLocalDto, ownerId: number): Promise<Local> {
        const owner = await this.usersService.findOneUserById(ownerId);
        
        const local = new LocalBuilder()
            .setName(dto.name)
            .setAddress(dto.address)
            .setDescription(dto.description)
            .setPricePerDay(dto.pricePerDay)
            .setOwner(owner)
            .build();
        
        return await this.localsRepository.save(local);
    }

    async update(id: number, dto: UpdateLocalDto): Promise<Local> {
        const local = await this.findOne(id);
        Object.assign(local, dto);
        return await this.localsRepository.save(local);
    }

    async remove(id: number): Promise<Local> {
        const local = await this.findOne(id);
        return await this.localsRepository.remove(local);
    }
}