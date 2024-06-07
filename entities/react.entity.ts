import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Post } from './post.entity';

@Entity()
export class React {
  @PrimaryGeneratedColumn()
  reactId: number;

  @Column()
  userId: number;

  @Column()
  postId: number;

  @ManyToOne(() => User, user => user.reacts)
  user: User;

  @ManyToOne(() => Post, post => post.reacts)
  post: Post;

  @Column()
  reactType: string;

  @Column()
  reactDate: Date;
}
