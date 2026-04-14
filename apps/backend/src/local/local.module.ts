import { Module } from '@nestjs/common';
import { LocalService } from './local.service';
import { LocalController } from './local.controller';

@Module({
  providers: [LocalService],
  controllers: [LocalController]
})
export class LocalModule {}
