import { Module } from '@nestjs/common';
import SsrService from './ssr.service';
import SsrController from './ssr.controller';

@Module({
  imports: [],
  controllers: [SsrController],
  providers: [SsrService],
})
export class AuthModule {}
