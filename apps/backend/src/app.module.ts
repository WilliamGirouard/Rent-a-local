import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReportsModule } from './reports/reports.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { HashingModule } from './hashing/hashing.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot(
    {
      type: "sqlite",
      database: "db.sqlite",
      entities: [User],
      synchronize: true,
    }
),ConfigModule.forRoot( 
  {
    envFilePath: ".env",
    isGlobal:true,
  }), UsersModule, ReportsModule, HashingModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
