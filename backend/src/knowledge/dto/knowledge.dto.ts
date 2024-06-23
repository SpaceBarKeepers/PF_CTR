import {
    IsObject,
} from "class-validator";
import {KnowledgeInterface} from "../interfaces/knowledge.interface";

export class NewKnowledgeDto {
    @IsObject()
    readonly cs: KnowledgeInterface;

    @IsObject()
    readonly en: KnowledgeInterface;
}
