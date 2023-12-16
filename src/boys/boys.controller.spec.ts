import { Test, TestingModule } from '@nestjs/testing';
import { BoysController } from './boys.controller';

describe('BoysController', () => {
  let controller: BoysController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoysController],
    }).compile();

    controller = module.get<BoysController>(BoysController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
