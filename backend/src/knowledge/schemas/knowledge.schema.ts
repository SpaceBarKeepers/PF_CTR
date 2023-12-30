import {HydratedDocument, now} from "mongoose";
import {Prop, SchemaFactory, Schema} from "@nestjs/mongoose";

export type KnowledgeDocument = HydratedDocument<Knowledge>;

@Schema()
export class Knowledge {
    @Prop({required: true})
    title: string;

    @Prop()
    thumbnail?: string;

    @Prop()
    tags?: string[];

    @Prop()
    content?: string;

    @Prop({default: Date.now})
    createdAt?: number;

    @Prop({default: Date.now})
    updatedAt?: number;
}

export const KnowledgeSchema = SchemaFactory.createForClass(Knowledge);
