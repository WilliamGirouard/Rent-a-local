import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { HashingModule } from 'src/hashing/hashing.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [ HashingModule, AuthModule],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule {}
