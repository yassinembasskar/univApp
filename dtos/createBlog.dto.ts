import { IsString, IsDate, IsOptional } from 'class-validator';

export class CreateBlogDto {
  @IsString()
  blogTitle: string;

  @IsString()
  userId: number;

  @IsString()
  blogStatus: string;

  @IsString()
  blogWriter: string;

  @IsOptional()
  @IsString()
  blogImage?: string;

  @IsDate()
  blogDate: Date;

  @IsOptional()
  @IsString()
  blogResponse?: string;
}
