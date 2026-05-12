import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Local } from './locals.entity';
import { LocalsService } from './locals.service';
import { LocalsController } from './locals.controller';
import { Reservation } from 'src/reservations/reservations.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Local, Reservation])],
  controllers: [LocalsController],
  providers: [LocalsService],
  exports: [LocalsService]
})
export class LocalsModule {}