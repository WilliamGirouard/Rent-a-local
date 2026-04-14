import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Local } from './locals.entity';
import { CreateLocalDto } from '../dtos/create-local.dto';
import { UpdateLocalDto } from '../dtos/update-local.dto';
import { LocalBuilder } from './locals.builder';

@Injectable()
export class LocalsService {
    constructor(
        @InjectRepository(Local)
        private localsRepository: Repository<Local>,
        // UsersService est ENLEVÉ - pas besoin
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

    async create(dto: CreateLocalDto): Promise<Local> {
        // Pas de ownerId, pas de recherche d'owner
        const local = new LocalBuilder()
            .setName(dto.name)
            .setAddress(dto.address)
            .setDescription(dto.description)
            .setPricePerDay(dto.pricePerDay)
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