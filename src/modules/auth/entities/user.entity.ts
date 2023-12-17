import {
  Column,
  Entity,
  Generated,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('t_user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  password: string;
  @Column()
  username: string;
  @Column({
    nullable: true,
  })
  avatar?: string;
  @Column({
    nullable: true,
  })
  createTime: string;
  @Column({
    nullable: true,
  })
  email: string;
  @Column({
    nullable: true,
  })
  nickname: string;
  @Column({
    nullable: true,
  })
  type: number;
  @Column({
    nullable: true,
  })
  updateTime: string;
}
