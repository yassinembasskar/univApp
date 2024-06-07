import { IsString, IsOptional, IsDate } from 'class-validator';

export class UpdateRepostDto {
  @IsOptional()
  @IsString()
  repostComment?: string;
}
