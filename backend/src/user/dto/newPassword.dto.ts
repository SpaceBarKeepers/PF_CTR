import { IsNotEmpty, IsString } from 'class-validator';

export class NewPasswordDto {
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
