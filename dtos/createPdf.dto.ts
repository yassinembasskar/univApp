import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePdfDto {
  @IsNotEmpty()
  @IsNumber()
  sessionId: number;

  @IsNotEmpty()
  @IsString()
  pdfName: string;

  @IsNotEmpty()
  @IsString()
  pdfLink: string;
}
