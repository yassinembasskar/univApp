import { IsString, IsNotEmpty, IsDate, IsNumber } from 'class-validator';

export class CreateSessionDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsString()
  indexName: string;

  @IsNotEmpty()
  @IsString()
  sessionName: string;

  @IsNotEmpty()
  @IsDate()
  sessionDate: string;

  @IsNotEmpty()
  @IsDate()
  sessionLink: Date;
}