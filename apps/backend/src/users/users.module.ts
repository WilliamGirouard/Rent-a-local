import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { HashingModule } from 'src/hashing/hashing.module';
import { UserFactory } from './user.factory';

@Module({
  imports: [TypeOrmModule.forFeature([User]), HashingModule],
  providers: [UsersService, UserFactory],
  controllers: [UsersController],
  exports: [UsersService, UserFactory]
})
export class UsersModule {}
