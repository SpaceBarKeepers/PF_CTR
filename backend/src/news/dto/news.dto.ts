import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';
import { Tag } from '../../tag/entities/tag.entity';

export class NewsDto {
  @IsBoolean()
  publishedCs: boolean;

  @IsString()
  @MinLength(2, { message: 'Title must have at least 2 characters.' })
  @IsNotEmpty()
  titleCs: string;

  @IsString()
  subtitleCs: string;

  @IsString()
  @IsNotEmpty()
  contentCs: string;

  @IsBoolean()
  publishedEn: boolean;

  @IsString()
  @MinLength(2, { message: 'Title must have at least 2 characters.' })
  @IsNotEmpty()
  titleEn: string;

  @IsString()
  subtitleEn: string;

  @IsString()
  @IsNotEmpty()
  contentEn: string;

  @IsNumber()
  featuredPosition: number;

  @IsString()
  thumbnail: string;

  @IsArray()
  tags: Tag[];

  @IsArray()
  geotags: string[];

  @IsBoolean()
  interview: boolean;

  @IsBoolean()
  caseStudy: boolean;
}
