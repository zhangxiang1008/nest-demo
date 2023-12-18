import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('t_blog')
export class Blog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  appreciation: boolean;

  @Column()
  commentabled: boolean;

  @Column({
    nullable: true,
  })
  content: string;

  @Column({
    nullable: true,
  })
  createTime: string;

  @Column({
    nullable: true,
  })
  description: string;

  @Column({
    nullable: true,
  })
  firstPicture: string;

  @Column({
    nullable: true,
  })
  flag: string;

  @Column()
  published: boolean;

  @Column()
  recommend: boolean;

  @Column()
  shareStatement: boolean;

  @Column({
    nullable: true,
  })
  title: string;

  @Column({
    nullable: true,
  })
  updateTime: string;

  @Column({
    nullable: true,
  })
  views: number;

  @Column({
    nullable: true,
  })
  typeId: number;

  @Column()
  userId: number;
}
