import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { EnvConfigService } from './env-config/env-config.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
}
