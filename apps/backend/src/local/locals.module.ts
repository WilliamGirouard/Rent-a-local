import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Local } from './locals.entity';
import { LocalsService } from './locals.service';
import { LocalsController } from './locals.controller';
import { Reservation } from 'src/reservations/reservations.entity';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [TypeOrmModule.forFeature([Local, Reservation]), CloudinaryModule],
  controllers: [LocalsController],
  providers: [LocalsService],
  exports: [LocalsService]
})
export class LocalsModule {}