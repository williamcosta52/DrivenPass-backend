import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class EraseDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsString()
  @IsNotEmpty()
  password: string;
}
