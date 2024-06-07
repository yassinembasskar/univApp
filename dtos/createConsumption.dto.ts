import { IsString, IsDate, IsDecimal, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateConsumptionHistoryDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsDate()
  consumptionDate: Date;

  @IsNotEmpty()
  @IsDecimal()
  consumptionAmount: number;

  @IsNotEmpty()
  @IsString()
  consumptionWay: string;

  @IsNotEmpty()
  @IsString()
  consumptionType: string;
}