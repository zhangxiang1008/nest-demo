import { DynamicModule, Module } from '@nestjs/common';
import { EnvConfigService } from './env-config.service';
import { CONFIG_OPTION } from './const';

@Module({})
export class EnvConfigModule {
  static register(options): DynamicModule {
    return {
      module: EnvConfigModule,
      providers: [
        {
          provide: CONFIG_OPTION,
          useValue: options,
        },
        EnvConfigService,
      ],
      exports: [EnvConfigService],
    };
  }
}
