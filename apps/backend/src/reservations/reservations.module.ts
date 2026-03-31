import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { Reservation } from './reservations.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { UsersModule } from 'src/users/users.module';
import { LocalsModule } from 'src/locals/locals.module';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation]), UsersModule, LocalsModule], 
  providers: [ReservationsService],
  controllers: [ReservationsController]
})
export class ReservationsModule {}
