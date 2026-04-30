import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from 'src/reservations/dtos/create-reservation.dto';
import { UpdateReservationDto } from 'src/reservations/dtos/update-reservation.dto';
import { ReservationDto } from 'src/reservations/dtos/reservation.dto';
import { currentUser } from 'src/users/decorators/current-user.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { AdminGuard } from 'src/auth/guards/admin.guard';

@Controller('reservations')
export class ReservationsController {
  constructor(private reservationsService: ReservationsService) {}

  @Serialize(ReservationDto)
  @Get()
  async findAll() {
    return await this.reservationsService.findAll();
  }

  @Serialize(ReservationDto)
  @UseGuards(AuthGuard)
  @Get('me')
  async findMyReservations(@currentUser() user: any) {
    return await this.reservationsService.findAllForUser(user.sub);
  }
  @Serialize(ReservationDto)
  @Get('/:id')
  async findOne(@Param('id') id: number) {
    return await this.reservationsService.findOne(id);
  }

  @Serialize(ReservationDto)
  @Post()
  async createReservation(@Body() body: CreateReservationDto) {
    return await this.reservationsService.create(body);
  }

  @Serialize(ReservationDto)
  @Delete('/:id')
  async remove(@Param('id') id: number) {
    return await this.reservationsService.remove(id);
  }

  @UseGuards(AdminGuard)
  @Serialize(UpdateReservationDto)
  @Patch('/:id')
  async update(@Param('id') id: number, @Body() body: UpdateReservationDto) {
    return await this.reservationsService.update(id, body);
  }
}
