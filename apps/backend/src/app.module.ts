import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReportsModule } from './reports/reports.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { HashingModule } from './hashing/hashing.module';

@Module({
  imports: [TypeOrmModule.forRoot(
    {
      type: "sqlite",
      database: "db.sqlite",
      entities: [User],
      synchronize: true,
    }
), UsersModule, ReportsModule, HashingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
