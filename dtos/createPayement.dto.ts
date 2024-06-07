import { IsNumber, IsString, IsDate, IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePaymentHistoryDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  paymentAmount: number;

  @IsNotEmpty()
  @IsString()
  paymentReference: string;

  @IsOptional()
  @IsDate()
  usageStartDate: Date;

  @IsOptional()
  @IsDate()
  usageEndDate: Date;

  @IsNotEmpty()
  @IsDate()
  paymentDate: Date;
}