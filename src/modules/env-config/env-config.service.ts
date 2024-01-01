import { Inject, Injectable } from '@nestjs/common';
import { EnvConfig } from './types';
import path from 'path';
import * as dotenv from 'dotenv';
import fs from 'fs';
import { CONFIG_OPTION } from './const';

@Injectable()
export class EnvConfigService {
  private readonly configOption: EnvConfig;

  constructor(@Inject(CONFIG_OPTION) private options) {
    const filePath = `${process.env.NODE_ENV || 'development'}.env`;
    const envFile = path.resolve(__dirname, '../../', options.folder, filePath);
    // @ts-ignore
    this.configOption = dotenv.parse(fs.readFileSync(envFile));
  }

  get(ket: string): any {
    return this.configOption?.[ket];
  }
}
