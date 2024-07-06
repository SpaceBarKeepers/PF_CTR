import {
    IsArray,
    IsBoolean,
    IsNotEmpty,
    IsNumber,
    IsString,
    MinLength,
} from 'class-validator';

export class TagDto {
    @IsString()
    tagEn: string;

    @IsString()
    tagCs: string;
}
