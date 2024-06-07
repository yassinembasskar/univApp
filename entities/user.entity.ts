import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { University } from './university.entity';
import { Blog } from './blog.entity';
import { Comment } from './comment.entity';
import { ConsumptionHistory } from './consumption.entity';
import { Feedback } from './feedback.entity';
import { Notification } from './notification.entity';
import { PaymentHistory } from './payement.entity';
import { Post } from './post.entity';
import { Problem } from './problem.entity';
import { React } from './react.entity';
import { Repost } from './repost.entity';
import { Save } from './save.entity';
import { Like } from './like.entity';
import { Session } from './session.entity';
import { Spam } from './spam.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  login: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  secondEmail: string;

  @Column({ nullable: true })
  firstname: string;

  @Column({ nullable: true })
  lastname: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @Column({ nullable: true })
  profilePic: string;

  @Column({ nullable: true })
  profileBio: string;

  @Column({ nullable: true })
  title: string;

  @Column()
  completeSignup: boolean;

  @Column({ nullable: true })
  univId: number;

  @ManyToOne(() => University, university => university.users)
  university: University;

  @OneToMany(() => Blog, blog => blog.user)
  blogs: Blog[];

  @OneToMany(() => Comment, comment => comment.user)
  comments: Comment[];

  @OneToMany(() => ConsumptionHistory, consumptionHistory => consumptionHistory.user)
  consumptionHistories: ConsumptionHistory[];

  @OneToMany(() => Feedback, feedback => feedback.user)
  feedbacks: Feedback[];

  @OneToMany(() => Notification, notification => notification.user)
  notifications: Notification[];

  @OneToMany(() => PaymentHistory, paymentHistory => paymentHistory.user)
  paymentHistories: PaymentHistory[];

  @OneToMany(() => Post, post => post.user)
  posts: Post[];

  @OneToMany(() => Problem, problem => problem.user)
  problems: Problem[];

  @OneToMany(() => React, react => react.user)
  reacts: React[];

  @OneToMany(() => Repost, repost => repost.user)
  reposts: Repost[];

  @OneToMany(() => Save, save => save.user)
  saves: Save[];

  @OneToMany(() => Like, like => like.user)
  likes: Like[];

  @OneToMany(() => Session, session => session.user)
  sessions: Session[];

  @OneToMany(() => Spam, spam => spam.reportedBy)
  reportedSpam: Spam[];

  @OneToMany(() => Spam, spam => spam.reporter)
  reportedBySpam: Spam[];

  @ManyToMany(() => User, user => user.following)
  @JoinTable()
  followers: User[];

  @ManyToMany(() => User, user => user.followers)
  following: User[];
}
