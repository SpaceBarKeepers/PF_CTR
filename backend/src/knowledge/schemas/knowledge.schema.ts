import mongoose, {HydratedDocument} from "mongoose";
import {Prop, SchemaFactory, Schema} from "@nestjs/mongoose";
import {Tag} from "../../tag/schemas/tag.schema";

export type KnowledgeDocument = HydratedDocument<Knowledge>;

@Schema({ _id : false })
export class KnowledgeLanguage {
    @Prop({required: true})
    title?: string;

    @Prop()
    content?: string;

    @Prop()
    thumbnail?: string;

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: "Tag"}]})
    tags?: Tag[];
}

@Schema()
export class Knowledge {
    @Prop({
        required: function() {
            return !this.en;
        },
    })
    cs?: KnowledgeLanguage;

    @Prop({
        required: function() {
            return !this.cs;
        },
    })
    en?: KnowledgeLanguage;

    @Prop({default: Date.now})
    createdAt?: number;

    @Prop({default: Date.now})
    updatedAt?: number;
}

export const KnowledgeSchema = SchemaFactory.createForClass(Knowledge);
