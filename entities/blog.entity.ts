import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Like } from './like.entity';
import { Feedback } from './feedback.entity';
import { Paragraph } from './paragraph.entity';

@Entity()
export class Blog {
  @PrimaryGeneratedColumn()
  blogId: number;

  @ManyToOne(() => User, user => user.blogs)
  user: User;

  @Column()
  blogTitle: string;

  @Column()
  blogStatus: string;

  @Column({ nullable: true })
  blogImage: string;

  @Column()
  blogDate: Date;

  @Column({ nullable: true })
  blogResponse: string;

  @OneToMany(() => Like, like => like.blog)
  likes: Like[];

  @OneToMany(() => Feedback, feedback => feedback.blog)
  feedbacks: Feedback[];

  @OneToMany(() => Paragraph, paragraph => paragraph.blog)
  paragraphs: Paragraph[];
}
