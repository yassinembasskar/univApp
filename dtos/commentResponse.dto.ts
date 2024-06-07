import { User } from "src/entities/user.entity";
import { Post } from "src/entities/post.entity";

export class CommentResponseDto {
  commentId: number;
  user: User;
  post: Post;
  commentDate: Date;
  commentContent: string;
}