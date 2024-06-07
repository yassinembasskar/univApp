import { Like } from 'src/entities/like.entity';
import { Feedback } from 'src/entities/feedback.entity';
import { Paragraph } from 'src/entities/paragraph.entity';

export class BlogResponseDto {
  blogId: number;
  userId: number;
  blogTitle: string;
  blogStatus: string;
  blogWriter: string;
  blogImage?: string;
  blogDate: Date;
  blogResponse?: string;
  likes: Like[];
  feedbacks: Feedback[];
  paragraphs: Paragraph[];
}