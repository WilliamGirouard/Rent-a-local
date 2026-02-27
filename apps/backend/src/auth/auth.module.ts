import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { HashingModule } from 'src/hashing/hashing.module';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
@Module({
  providers: [AuthService],
  imports: [TypeOrmModule.forFeature([User]), JwtModule.registerAsync({
    inject:[ConfigService],
    useFactory: (configService: ConfigService) => ({
      secret: configService.getOrThrow("JWT_SECRET"),
      signOptions: {expiresIn:configService.getOrThrow("JWT_EXPIRES"),},
    }),
    global: true,

    }), HashingModule],
  controllers: [AuthController],
  exports:[AuthService],
})
export class AuthModule {}
