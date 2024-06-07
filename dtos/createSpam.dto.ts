import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateSpamDto {
  @IsOptional()
  @IsNotEmpty()
  reportedById: number;

  @IsNotEmpty()
  reporterId: number;

  @IsOptional()
  postId: number;

  @IsNotEmpty()
  @IsString()
  spamType: string;

  @IsNotEmpty()
  @IsString()
  spamContent: string;

  @IsNotEmpty()
  @IsString()
  spamSource: string;
}
