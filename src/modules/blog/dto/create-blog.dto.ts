import { Blog } from '../entities/blog.entity';

export class CreateBlogDto extends Blog {}

export interface PaginationType {
  pageNum: number;
  pageSize: number;
}
