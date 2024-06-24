import {HydratedDocument} from "mongoose";
import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";

export type TagDocument = HydratedDocument<Tag>;

@Schema()
export class Tag {
  @Prop({required: true, unique: true})
  tag: string;
}

  export const TagSchema = SchemaFactory.createForClass(Tag);
