import { IsString, IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateFeedbackDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  blogId: number;

  @IsNotEmpty()
  @IsDate()
  feedbackDate: Date;

  @IsNotEmpty()
  @IsString()
  feedbackContent: string;
}
