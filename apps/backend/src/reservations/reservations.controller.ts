import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { Reservation } from './reservations.entity';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from 'src/dtos/create-reservation.dto';
import { UpdateReservationDto } from 'src/dtos/update-reservation.dto';
import { ReservationDto } from 'src/dtos/reservation.dto';

@Controller('reservations')
export class ReservationsController {

    constructor(private reservationsService: ReservationsService) {}

    @Serialize(ReservationDto)
    @Get()
    async findAll() {
        return await this.reservationsService.findAll();
    }

    @Serialize(ReservationDto)
    @Get("/:id")
    async findOne(@Param("id") id: number) {
        return await this.reservationsService.findOne(id);
    }

    @Serialize(ReservationDto)
    @Post()
    async createReservation (@Body() body: CreateReservationDto) {
        return await this.reservationsService.create(body);
    }

    @Delete("/:id")
    async remove(@Param("id") id: number) {
        return await this.reservationsService.remove(id);
    }

    @Serialize(UpdateReservationDto)
    @Patch("/:id")
    async update(@Param("id") id: number, @Body() body: UpdateReservationDto) {
        return await this.reservationsService.update(id, body);
    }
}
