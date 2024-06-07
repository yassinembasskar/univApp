import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Post } from './post.entity';

@Entity()
export class Repost {
  @PrimaryGeneratedColumn()
  repostId: number;

  @Column()
  userId: number;

  @Column()
  postId: number;

  @ManyToOne(() => User, user => user.reposts)
  user: User;

  @ManyToOne(() => Post, post => post.reposts)
  post: Post;

  @Column({ nullable: true })
  repostComment: string;

  @Column()
  repostDate: Date;
}
