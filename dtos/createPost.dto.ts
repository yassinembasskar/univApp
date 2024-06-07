import { IsString, IsNotEmpty, IsDate, IsNumber, IsIn, IsOptional } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsString()
  postContent: string;

  @IsNotEmpty()
  @IsDate()
  postDate: Date;

  @IsNotEmpty()
  @IsIn(['public', 'private'])
  postVisibility: string;
}