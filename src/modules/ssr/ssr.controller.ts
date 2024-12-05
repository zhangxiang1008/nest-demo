import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/decorators/roles.decorator';
import SsrService from './ssr.service';

@Controller('ssr')
export default class SsrController {
  constructor(private readonly ssrService: SsrService) {}

  @Public()
  @Get('index')
  async getIndex() {
    const indexString = this.ssrService.getIndexString();
    return Promise.resolve({
      success: true,
      message: '成功',
      data: indexString,
    });
  }
}
