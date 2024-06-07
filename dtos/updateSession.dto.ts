import { IsString, IsOptional } from 'class-validator';

export class UpdateSessionDto {

  @IsOptional()
  @IsString()
  sessionName?: string;

}
