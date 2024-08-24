import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class FeedDto {
  @IsDate()
  @IsNotEmpty()
  date: Date;

  @IsString()
  @MinLength(2, { message: 'Title must have at least 2 characters.' })
  @IsNotEmpty()
  titleCs: string;

  @IsString()
  @MinLength(2, { message: 'Title must have at least 2 characters.' })
  @IsNotEmpty()
  titleEn: string;

  @IsString()
  url: string;
}
