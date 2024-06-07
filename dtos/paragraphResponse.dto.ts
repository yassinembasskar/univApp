import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateParagraphDto {
  @IsNotEmpty()
  @IsNumber()
  blogId: number;

  @IsNotEmpty()
  @IsString()
  paragraphTitle: string;

  @IsOptional()
  @IsString()
  paragraphImage: string;

  @IsNotEmpty()
  @IsString()
  paragraphContent: string;

  @IsNotEmpty()
  @IsNumber()
  paragraphOrder: number;
}