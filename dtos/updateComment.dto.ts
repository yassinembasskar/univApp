import { IsString } from 'class-validator';

export class UpdateCommentDto {

  @IsString()
  commentContent?: string;

}
