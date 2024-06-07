import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateImageDto {
  @IsNumber()
  postId: number;

  @IsNumber()
  imgOrder: number;

  @IsString()
  imgLink: string;
}
