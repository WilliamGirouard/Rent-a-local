import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { HashingModule } from 'src/hashing/hashing.module';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';
import { AdminGuard } from 'src/auth/guards/admin.guard';

@Module({
  providers: [AuthService, AdminGuard
  ],
  imports: [JwtModule.registerAsync({
    inject:[ConfigService],
    useFactory: (configService: ConfigService) => ({
      secret: configService.getOrThrow("JWT_SECRET"),
      signOptions: {expiresIn:configService.getOrThrow("JWT_EXPIRES"),},
    }),
    global: true,

    }), HashingModule, UsersModule],
  controllers: [AuthController],
  exports:[AuthService],
})
export class AuthModule {}
