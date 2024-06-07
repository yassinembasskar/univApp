import { IsString, IsIn, IsOptional } from 'class-validator';

export class UpdatePostDto {
  @IsOptional()
  @IsString()
  postContent?: string;

  @IsOptional()
  @IsIn(['public', 'private']) 
  postVisibility?: string;
}