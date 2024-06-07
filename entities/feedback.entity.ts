import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Blog } from './blog.entity';

@Entity()
export class Feedback {
  @PrimaryGeneratedColumn()
  feedbackId: number;

  @ManyToOne(() => User, user => user.feedbacks)
  user: User;

  @ManyToOne(() => Blog, blog => blog.feedbacks)
  blog: Blog;

  @Column()
  feedbackDate: Date;

  @Column()
  feedbackContent: string;
}
