import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateOfferDto {
  @IsNotEmpty()
  @IsString()
  offerUnivName: string;

  @IsOptional()
  @IsString()
  offerUnivWebsite: string;

  @IsNotEmpty()
  @IsString()
  offerUnivLocation: string;

  @IsNotEmpty()
  @IsString()
  offerStatus: string;

  @IsOptional()
  @IsString()
  offerResponse: string;

  @IsNotEmpty()
  @IsString()
  offerAdminEmail: string;

  @IsNotEmpty()
  @IsString()
  offerAdminPassword: string;

  @IsOptional()
  @IsString()
  offerUnivLogo: string;
}
