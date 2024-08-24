import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class EventsDto {
  @IsBoolean()
  publishedCs: boolean;

  @IsString()
  @MinLength(2, { message: 'Title must have at least 2 characters.' })
  @IsNotEmpty()
  titleCs: string;

  @IsBoolean()
  publishedEn: boolean;

  @IsString()
  @MinLength(2, { message: 'Title must have at least 2 characters.' })
  @IsNotEmpty()
  titleEn: string;

  @IsDate()
  @IsNotEmpty()
  eventAt: Date;

  @IsString()
  eventTimeAt: string;

  @IsString()
  location: string;
}
