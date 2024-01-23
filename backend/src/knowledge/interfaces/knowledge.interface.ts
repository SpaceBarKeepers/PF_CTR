import {Tag} from "../../tag/interfaces/tag.interface";

export interface KnowledgeInterface {
    title?: string;
    thumbnail?: string;
    tags?: Tag[];
    content?: string;
    createdAt?: number;
    updatedAt?: number;
}
