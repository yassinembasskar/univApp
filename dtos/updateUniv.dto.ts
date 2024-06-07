import { IsString, IsOptional } from 'class-validator';

export class UpdateUniversityDto {
  @IsOptional()
  @IsString()
  univName?: string;

  @IsOptional()
  @IsString()
  univWebsite?: string;

  @IsOptional()
  @IsString()
  univLogo?: string;
}
