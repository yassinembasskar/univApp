import { IsNotEmpty, IsOptional, IsDate, IsNumber } from 'class-validator';

export class CreateSaveDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  postId: number;

  @IsOptional()
  @IsDate()
  saveDate?: Date;
}
