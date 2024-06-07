import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Blog } from './blog.entity';

@Entity()
export class Like {
  @PrimaryGeneratedColumn()
  likeId: number;

  @ManyToOne(() => User, user => user.likes)
  user: User;

  @ManyToOne(() => Blog, blog => blog.likes)
  blog: Blog;
}
