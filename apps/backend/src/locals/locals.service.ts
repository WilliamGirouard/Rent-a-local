import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Local } from './locals.entity';
import { Repository } from 'typeorm';
import { CreateLocalDto } from 'src/dtos/create-local.dto';
import { LocalFactory } from './locals.factory';

@Injectable()
export class LocalsService {
    constructor(
        @InjectRepository(Local)
        private repo: Repository<Local>,
        //Pas besoin de usersService ici, car reservation contient tout les ids
        // private usersService: UsersService
    ) {}

    async create(dto: CreateLocalDto): Promise<Local> {
        
        const local = LocalFactory.create(dto);
        return await this.repo.save(local);
    }

    async findAll(): Promise<Local[]> {
        // Ce n'est pas la bonne méthode pour lister tous les locaux. Inspire toi de User
        // Local n'a besoin de User. Un local qui se fait réserver ===> Réservations
        // await this.repo.find()
        return await this.repo.find(/*{ relations: ['owner'] }*/);
    }

    async findOne(id: number): Promise<Local> {
        const local = await this.repo.findOneBy({id:id});
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