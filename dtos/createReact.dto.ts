import { IsString, IsNotEmpty, IsDate, IsIn, IsNumber } from 'class-validator';

export class CreateReactDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  postId: number;

  @IsNotEmpty()
  @IsString()
  @IsIn(['like', 'love', 'inspiring', 'dislike', 'support'])
  reactType: string;

  @IsNotEmpty()
  @IsDate()
  reactDate: Date;
}
