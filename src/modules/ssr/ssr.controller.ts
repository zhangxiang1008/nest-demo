import { Controller, Get, Render } from '@nestjs/common';
import { Public } from 'src/decorators/roles.decorator';
import SsrService from './ssr.service';

@Controller()
export default class SsrController {
  constructor(private readonly ssrService: SsrService) {}

  @Public()
  @Get('index')
  getIndex() {
    return this.ssrService.getIndexString();
  }
}
