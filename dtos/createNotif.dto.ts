import { IsString, IsNotEmpty, IsDate, IsEnum } from 'class-validator';

export class CreateNotificationDto {
  @IsNotEmpty()
  @IsString()
  notifName: string;

  @IsNotEmpty()
  @IsString()
  notifLink: string;

  @IsNotEmpty()
  @IsString()
  notifType: string;

  @IsNotEmpty()
  @IsDate()
  notifDate: Date;

  @IsNotEmpty()
  @IsString()
  notifStatus: string;
}