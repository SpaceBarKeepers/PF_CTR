import { IsNotEmpty, IsString } from 'class-validator';

export class PageDto {
  @IsString()
  @IsNotEmpty()
  contentCs: string;

  @IsString()
  @IsNotEmpty()
  contentEn: string;
}
