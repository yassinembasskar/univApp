import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Comment } from './comment.entity';
import { Image } from './image.entity';
import { React } from './react.entity';
import { Repost } from './repost.entity';
import { Save } from './save.entity';
import { Spam } from './spam.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  postId: number;

  @Column()
  userId: number;

  @ManyToOne(() => User, user => user.posts)
  user: User;

  @Column()
  postContent: string;

  @Column()
  postDate: Date;

  @Column()
  postVisibility: string;

  @Column()
  postViews: number;

  @OneToMany(() => Comment, comment => comment.post)
  comments: Comment[];

  @OneToMany(() => Image, image => image.post)
  images: Image[];

  @OneToMany(() => React, react => react.post)
  reacts: React[];

  @OneToMany(() => Repost, repost => repost.post)
  reposts: Repost[];

  @OneToMany(() => Save, save => save.post)
  saves: Save[];

  @OneToMany(() => Spam, spam => spam.post)
  spams: Spam[];
}
