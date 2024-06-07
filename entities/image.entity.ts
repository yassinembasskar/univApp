import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Post } from './post.entity';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  imgId: number;

  @ManyToOne(() => Post, post => post.images)
  post: Post;

  @Column()
  imgOrder: number;

  @Column()
  imgLink: string;
  path: any;
}
