import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersService } from './service/users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { AuthService } from './service/auth.service';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CurrentUserMiddleware } from './middleware/current-user.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  //providers: [UsersService, AuthService, CurrentUserInterceptor],
  providers: [UsersService, AuthService,
    //{
    //  provide: APP_INTERCEPTOR,
    //  useClass: CurrentUserInterceptor
    //}
  ],
  controllers: [UsersController]
})
export class UsersModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes("*")
  }
}
