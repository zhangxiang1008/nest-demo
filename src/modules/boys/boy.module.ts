import { Module } from '@nestjs/common';
import { BoysController } from './boys.controller';
import { BoysService } from './boys.service';
import { Boys } from './boys.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Boys])],
  controllers: [BoysController],
  providers: [BoysService],
})
export class BoyModule {}
