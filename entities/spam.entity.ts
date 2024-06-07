import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Post } from './post.entity';

@Entity()
export class Spam {
  @PrimaryGeneratedColumn()
  spamId: number;

  @ManyToOne(() => User, user => user.reportedSpam, { nullable: true })
  reportedBy: User;

  @Column({ nullable: true })
  reportedId: number;

  @ManyToOne(() => User, user => user.reportedBySpam)
  reporter: User;

  @Column()
  reporterId: number;

  @ManyToOne(() => Post, post => post.spams, { nullable: true })
  post: Post;

  @Column({ nullable: true })
  postId: number;

  @Column()
  spamType: string;

  @Column()
  spamContent: string;

  @Column()
  spamDate: Date;

}
