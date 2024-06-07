import { IsNumber, IsString, IsDate, IsOptional } from 'class-validator';

export class UpdatePaymentHistoryDto {
  @IsOptional()
  @IsDate()
  usageStartDate?: Date;

  @IsOptional()
  @IsDate()
  usageEndDate?: Date;
}