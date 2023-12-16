import {
  Controller,
  Get,
  Req,
  Redirect,
  Post,
  Body,
  Param,
  HttpException,
  HttpStatus,
  ParseIntPipe,
  UsePipes,
  UseGuards,
} from '@nestjs/common';
import { BoysService } from './boys.service';
import { Request } from 'express';
import { Boys } from 'src/modules/boys/boys.entity';
import { ResultDTO } from 'src/dto/ResultDTO';
import { JoiValidationPipe } from 'src/pipes/JoiValidationPipe .pipe';
import { BoySchema } from 'src/modules/boys/BoySchema.schema';
import { Roles } from 'src/decorators/roles.decorator';
import { Transaction } from 'typeorm';

@Controller('boys')
export class BoysController {
  constructor(private readonly boyService: BoysService) {}
  /**
   * 列表接口
   * @returns
   */
  // @Roles('admin')
  @Get('list')
  async getList(): Promise<Boys[]> {
    return await this.boyService.getList();
  }

  @Get('req')
  @Redirect('https://nestjs.com', 301)
  findAll(@Req() request: Request): any {
    return request.query.id;
  }

  /**
   * 保存boy
   * @param boy
   * @returns
   */
  @UsePipes(new JoiValidationPipe(BoySchema))
  @Post('save')
  async create(@Body() boy: Boys): Promise<ResultDTO<any>> {
    const result = await this.boyService.saveBoy(boy);
    if (result) {
      return {
        success: true,
        message: '成功',
        data: result,
      };
    } else {
      return {
        success: false,
        message: '失败',
        data: result,
      };
    }
  }

  @Get('except')
  async getException() {
    console.log('get-----exception');
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }

  /**
   * 获取单个帅哥
   * @param id
   * @returns
   */
  @Get(':id')
  async getOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResultDTO<Boys>> {
    const boy = await this.boyService.getBoy(id);
    return {
      success: true,
      message: '成功',
      data: boy,
    };
  }
}
