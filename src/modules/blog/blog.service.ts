import { Injectable, Logger } from '@nestjs/common';
import { CreateBlogDto, PaginationType } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Repository } from 'typeorm';
import { Blog } from './entities/blog.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class BlogService {
  private readonly logger = new Logger(BlogService.name);
  constructor(
    @InjectRepository(Blog) private blogRepository: Repository<Blog>,
    private readonly redisService: RedisService,
  ) {}
  create(createBlogDto: CreateBlogDto) {
    return 'This action adds a new blog';
  }

  async findAll(pagination: PaginationType) {
    // this.logger.log('find all blog------------------11');
    const { pageSize = 10, pageNum = 1 } = pagination || {};
    return await this.blogRepository
      .createQueryBuilder('blog')
      .skip(pageSize * (pageNum - 1))
      .take(pageSize || 10)
      .getManyAndCount();
  }

  async findByuserId(userId: number) {
    const blogs = await this.blogRepository.findBy({
      userId,
    });
    return blogs;
  }
  /**
   * 查询单个博客内容
   * @param blogId 博客id
   * @returns
   */
  async findBlogByBlogId(blogId: number) {
    const blog = await this.blogRepository.findBy({
      id: blogId,
    });
    if (blog != null) {
      this.redisService.zIncrBy('blogRank', 1, `blog_${blogId}`);
    }
    return blog;
  }
  /**
   * 查询博客排名全局
   */
  async getRangedBlogs(number: number) {
    const ranks = this.redisService.zRange('blogRank', number);
    return ranks;
  }
}
