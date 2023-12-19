import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { ResultDTO } from 'src/dto/ResultDTO';
import { Blog } from './entities/blog.entity';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post('create')
  create(@Body() createBlogDto: CreateBlogDto) {
    return this.blogService.create(createBlogDto);
  }

  @Get()
  findAll() {
    return this.blogService.findAll();
  }

  @Get('users')
  async findByUserId(
    @Query('userId') userId: number,
  ): Promise<ResultDTO<Blog[]>> {
    try {
      const blogs = await this.blogService.findByuserId(userId);
      return Promise.resolve({
        success: true,
        message: '成功',
        data: blogs,
      });
    } catch (e) {
      return Promise.resolve({
        success: false,
        message: JSON.stringify(e),
      });
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogService.findOne(+id);
  }

  @Post('save')
  update(@Body() updateBlogDto: UpdateBlogDto) {
    return this.blogService.update(updateBlogDto.id, updateBlogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogService.remove(+id);
  }
}
