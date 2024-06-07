import { IsString, IsNotEmpty, IsDate } from 'class-validator';

export class CreateProblemDto {
  @IsNotEmpty()
  @IsString()
  problemTitle: string;

  @IsNotEmpty()
  @IsString()
  problemContent: string;

  @IsNotEmpty()
  @IsString()
  problemSource: string;

  @IsNotEmpty()
  @IsString()
  problemStatus: string;

  @IsString()
  problemResponse: string;

  @IsNotEmpty()
  @IsDate()
  problemDate: Date;
}
