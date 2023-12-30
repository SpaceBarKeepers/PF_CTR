import {HydratedDocument, Types} from "mongoose";
import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({required: true, unique: true})
  username: string;

  @Prop({required: true, select: false})
  password: string;

  @Prop()
  activeDevice?: string;
}

  export const UserSchema = SchemaFactory.createForClass(User);
