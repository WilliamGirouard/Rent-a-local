import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Local } from './locals.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { CreateLocalDto } from 'src/dtos/create-local.dto';
import { LocalFactory } from './locals.factory';

@Injectable()
export class LocalsService {
    constructor(
        @InjectRepository(Local)
        private repo: Repository<Local>,
        private usersService: UsersService
    ) {}

    async create(dto: CreateLocalDto): Promise<Local> {
        const owner = await this.usersService.findOneUserById(dto.ownerId);
        const local = LocalFactory.create(dto, owner);
        return await this.repo.save(local);
    }

    async findAll(): Promise<Local[]> {
        return await this.repo.find({ relations: ['owner'] });
    }

    async findOne(id: number): Promise<Local> {
        const local = await this.repo.findOne({ where: { id }, relations: ['owner'] });
        if (!local) {
            throw new BadRequestException('Local non trouvé.');
        }
        return local;
    }

    async remove(id: number): Promise<Local> {
        const local = await this.findOne(id);
        return await this.repo.remove(local);
    }

    async update(id: number, attrs: Partial<Local>): Promise<Local> {
        const local = await this.findOne(id);
        Object.assign(local, attrs);
        return await this.repo.save(local);
    }
}