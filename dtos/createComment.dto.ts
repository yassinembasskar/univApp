import { IsString, IsDate } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  userId: number;

  @IsString()
  postId: number;

  @IsDate()
  commentDate: Date;

  @IsString()
  commentContent: string;
}