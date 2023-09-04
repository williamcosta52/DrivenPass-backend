import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateNoteDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  note: string;

  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
