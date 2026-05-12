import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChangeRequest } from './change-request.entity';
import { ChangeRequestsService } from './change-requests.service';
import { ChangeRequestsController } from './change-requests.controller';
import { ReservationsModule } from 'src/reservations/reservations.module';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([ChangeRequest]),
        ReservationsModule,
        UsersModule,
    ],
    providers: [ChangeRequestsService],
    controllers: [ChangeRequestsController],
})
export class ChangeRequestsModule {}