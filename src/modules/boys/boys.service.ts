import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Boys } from './boys.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BoysService {
  constructor(
    @InjectRepository(Boys) private boyRepository: Repository<Boys>,
    private dataSource: DataSource,
  ) {}
  getList(): Promise<Boys[]> {
    return this.boyRepository.find();
  }
  getBoy(id: number): Promise<Boys> {
    return this.boyRepository.findOneBy({ id });
  }
  async saveBoy(boy: Boys): Promise<any> {
    const queryRuner = this.dataSource.createQueryRunner();
    await queryRuner.connect();
    await queryRuner.startTransaction();
    try {
      await queryRuner.manager.save(Boys, { ...boy });
      await queryRuner.commitTransaction();
      return Promise.resolve(boy);
    } catch (e) {
      await queryRuner.rollbackTransaction();
      console.log('error-----', e, boy, typeof boy);
      return Promise.resolve(e);
    } finally {
      await queryRuner.release();
    }
  }
}
