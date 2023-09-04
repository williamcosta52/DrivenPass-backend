import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';

export class CreateCredentialDto {
  @IsUrl()
  @IsString()
  @IsNotEmpty()
  url: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsNumber()
  userId: number;

  constructor(
    url: string,
    title: string,
    username: string,
    password: string,
    userId: number,
  ) {
    this.url = url;
    this.title = title;
    this.username = username;
    this.password = password;
    this.userId = userId;
  }
}
