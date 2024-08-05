import { IsNotEmpty, IsString } from 'class-validator';

export class ContactDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  organization: string;

  @IsString()
  phone: string;

  @IsString()
  @IsNotEmpty()
  message: string;
}
