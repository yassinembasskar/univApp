import { IsString, IsEmail, IsBoolean, IsOptional, IsNotEmpty, IsNumber } from 'class-validator';
import { University } from 'src/entities/university.entity';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  login: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsEmail()
  secondEmail?: string;

  @IsOptional()
  @IsString()
  firstname: string;

  @IsOptional()
  @IsString()
  lastname: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  role: string;

  @IsOptional()
  @IsString()
  profilePic?: string;

  @IsOptional()
  @IsString()
  profileBio?: string;

  @IsOptional()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsBoolean()
  completeSignup: boolean;

  @IsNotEmpty()
  univId: number;

  @IsNotEmpty()
  university: University;
}
