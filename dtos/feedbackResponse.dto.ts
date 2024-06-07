import { User } from "src/entities/user.entity";
import { Blog } from 'src/entities/blog.entity';

export class FeedbackResponseDto {
  feedbackId: number;
  user: User;
  blog: Blog;
  feedbackDate: Date;
  feedbackContent: string;
}