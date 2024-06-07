import { IsString, IsOptional } from 'class-validator';

export class UpdateFeedbackDto {

  @IsOptional()
  @IsString()
  feedbackContent?: string;

}