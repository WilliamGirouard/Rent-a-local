import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Local } from './locals.entity';
import { LocalsService } from './locals.service';
import { LocalsController } from './locals.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports: [TypeOrmModule.forFeature([Local]), UsersModule],
    providers: [LocalsService],
    controllers: [LocalsController],
    exports: [LocalsService],
})
export class LocalsModule {}