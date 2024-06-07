import { IsNotEmpty, IsOptional, IsString, IsDate, IsNumber } from 'class-validator';

export class CreateRepostDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  postId: number;

  @IsOptional()
  @IsString()
  repostComment?: string;

  @IsNotEmpty()
  @IsDate()
  repostDate: Date;
}
