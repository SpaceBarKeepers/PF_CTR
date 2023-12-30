import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import {Tag} from "./schemas/tag.schema";

@Injectable()
export class TagService {
  constructor(@InjectModel(Tag.name) private tagModel: Model<Tag>) {}

  async create(tag: Tag) {
    const tagAlreadyExists = await this.tagModel.findOne({tag: tag.tag}).exec();
    if (tagAlreadyExists) {
      throw new HttpException("Conflict: 'tag' already exists", HttpStatus.CONFLICT);
    }
    const createdTag = new this.tagModel(tag);
    return createdTag.save();
  }

  async findAll(): Promise<Tag[]> {
    return await this.tagModel.find().exec();
  }

  delete(tag: string) {
    return this.tagModel.findOneAndDelete({tag}).exec();
  }
}
