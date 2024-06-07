import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { User } from 'src/entities/user.entity';

export class CreateUniversityDto {
  @IsNotEmpty()
  @IsString()
  univName: string;

  @IsOptional()
  @IsString()
  univWebsite?: string;

  @IsNotEmpty()
  @IsString()
  univLocation: string;

  @IsNotEmpty()
  @IsString()
  univLogo: string;
}
