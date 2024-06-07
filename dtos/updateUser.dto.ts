import { IsOptional, IsString, IsEmail, IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  login?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsEmail()
  secondEmail?: string;

  @IsOptional()
  @IsString()
  firstname?: string;

  @IsOptional()
  @IsString()
  lastname?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  role?: string;

  @IsOptional()
  @IsString()
  profilePic?: string;

  @IsOptional()
  @IsString()
  profileBio?: string;

  @IsOptional()
  @IsString()
  title?: string;


  @IsOptional()
  @IsBoolean()
  completeSignup?: boolean;

  @IsOptional()
  @IsNumber()
  universityId?: number;
}
