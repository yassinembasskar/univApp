import { IsString, IsNotEmpty, IsDate, IsIn, IsOptional } from 'class-validator';

export class UpdateReactDto {
  @IsOptional()
  @IsString()
  @IsIn(['like', 'love', 'inspiring', 'dislike', 'support'])
  reactType?: string;

  @IsOptional()
  @IsDate()
  reactDate?: Date;
}