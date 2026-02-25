import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { HashingModule } from 'src/hashing/hashing.module';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Module({
  providers: [AuthService],
  imports: [JwtModule.registerAsync({
    inject:[ConfigService],
    useFactory: (configService: ConfigService) => ({
      secret: configService.getOrThrow("JWT_SECRET"),
      signOptions: {expiresIn:configService.getOrThrow("JWT_EXPIRES"),},
    }),
    global: true,

    }),UsersModule, HashingModule],
  controllers: [AuthController],
})
export class AuthModule {}
