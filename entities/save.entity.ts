import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Post } from './post.entity';

@Entity()
export class Save {
  @PrimaryGeneratedColumn()
  saveId: number;

  @Column()
  userId: number;

  @Column()
  postId: number;

  @ManyToOne(() => User, user => user.saves)
  user: User;

  @ManyToOne(() => Post, post => post.saves)
  post: Post;

  @Column()
  saveDate: Date;
}
