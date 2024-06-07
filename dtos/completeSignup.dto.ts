import { IsString, IsNotEmpty, IsNumber, IsOptional, IsEmail } from 'class-validator';

export class CompleteSignupDto {
  @IsNotEmpty()
  @IsString()
  login: string;

  @IsNotEmpty()
  @IsString()
  firstname: string;

  @IsOptional()
  @IsEmail()
  second_email: string;

  @IsOptional()
  @IsString()
  profile_pic: string;

  @IsOptional()
  @IsString()
  profile_bio: string;

  @IsNotEmpty()
  @IsString()
  lastname: string;

  @IsNotEmpty()
  @IsString()
  title: string;
}