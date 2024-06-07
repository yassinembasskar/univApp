import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Blog } from './blog.entity';

@Entity()
export class Paragraph {
  @PrimaryGeneratedColumn()
  paragraphId: number;

  @ManyToOne(() => Blog, blog => blog.paragraphs)
  blog: Blog;

  @Column()
  paragraphTitle: string;

  @Column({ nullable: true })
  paragraphImage: string;

  @Column()
  paragraphContent: string;

  @Column()
  paragraphOrder: number;
}
