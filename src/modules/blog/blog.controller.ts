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
import { CreateBlogDto, PaginationType } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { ResultDTO } from 'src/dto/ResultDTO';
import { Blog } from './entities/blog.entity';
import { number } from 'joi';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post('create')
  create(@Body() createBlogDto: CreateBlogDto) {
    return this.blogService.create(createBlogDto);
  }

  @Post()
  async findAll(@Body() pagination: PaginationType) {
    const list = await this.blogService.findAll(pagination);
    return Promise.resolve({
      success: true,
      message: '成功',
      data: list?.[0] || [],
      total: list?.[1] || 0,
    });
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

  @Get(':blogId')
  async findBlogByBlogId(@Param('blogId') blogId: number) {
    try {
      const blog = await this.blogService.findBlogByBlogId(blogId);
      return Promise.resolve({
        success: true,
        message: '成功',
        data: blog,
      });
    } catch (e) {
      return Promise.resolve({
        success: false,
        message: JSON.stringify(e),
      });
    }
  }
  @Get('rank/:number')
  async getRangedBlogs(@Param('number') number: number) {
    const blogs = await this.blogService.getRangedBlogs(number);
    return Promise.resolve({
      success: true,
      message: '成功',
      data: blogs,
    });
  }
}
