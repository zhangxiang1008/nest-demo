import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Boys {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  boyName: string;
  /**
   * cp id
   */
  @Column()
  userCP: number;
}
