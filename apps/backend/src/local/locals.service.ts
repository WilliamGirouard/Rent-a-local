import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Local } from './locals.entity';
import { Reservation } from 'src/reservations/reservations.entity';
import { CreateLocalDto } from './dtos/create-local.dto';
import { UpdateLocalDto } from './dtos/update-local.dto';
import { LocalBuilder } from './locals.builder';

@Injectable()
export class LocalsService {
  constructor(
    @InjectRepository(Local)
    private localsRepository: Repository<Local>,
    @InjectRepository(Reservation)
    private reservationsRepository: Repository<Reservation>,
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

  async findReservationsForLocal(localId: number): Promise<{ startDate: Date; endDate: Date }[]> {
    return this.reservationsRepository.find({
      where: { local: { id: localId } },
      relations: ['local'],
      select: ['startDate', 'endDate'],
    });
  }

  async create(dto: CreateLocalDto, imageURLS: string[]): Promise<Local> {
    const local = new LocalBuilder()
      .setName(dto.name)
      .setAddress(dto.address)
      .setDescription(dto.description)
      .setPricePerDay(dto.pricePerDay)
      .setLat(dto.lat)
      .setLng(dto.lng)
      .setImages(imageURLS)
      .build();

    return await this.localsRepository.save(local);
  }
  // update et remove vérifient si le local est réservé avant de procéder
  async update(id: number, dto: UpdateLocalDto): Promise<Local> {
    const local = await this.findOne(id);

    if (local.isReserved){
      throw new BadRequestException(`Local with ID ${id} is reserved and cannot be Updated`);
    }

    Object.assign(local, dto);
    return await this.localsRepository.save(local);
  }

  async remove(id: number): Promise<Local> {
    const local = await this.findOne(id);
    if (local.isReserved){
      throw new BadRequestException(`Local with ID ${id} is reserved and cannot be Removed`);
    }
    return await this.localsRepository.remove(local);
  }
  //aussi utilisation du 'BadRequestException' car le local existe surement, mais laction ne peut pas etre faite 
  
}
