import {IsArray, IsString} from "class-validator";

export class NewKnowledgeDto {
    @IsString()
    readonly title: string;

    @IsString()
    readonly thumbnail: string;

    @IsArray()
    readonly tags: string[];

    @IsString()
    readonly content: string;
}
