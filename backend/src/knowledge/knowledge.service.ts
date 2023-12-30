import {Injectable} from '@nestjs/common';
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {Knowledge} from "./schemas/knowledge.schema";

@Injectable()
export class KnowledgeService {
    constructor(@InjectModel(Knowledge.name) private knowledgeModel: Model<Knowledge>) {
    }

    async create(knowledge: Knowledge) {
        const createdKnowledge = new this.knowledgeModel(knowledge);
        return createdKnowledge.save();
    }

    async findAll(): Promise<Knowledge[]> {
        return await this.knowledgeModel.find().exec();
    }

    async findOne(id: string): Promise<Knowledge | null> {
        return this.knowledgeModel.findOne({_id: id}).exec();
    }

    async update(id: string, knowledge: Knowledge): Promise<Knowledge | null> {
        return this.knowledgeModel.findOneAndUpdate({_id: id}, knowledge).exec();
    }

    delete(id: string) {
        return this.knowledgeModel.findOneAndDelete({_id: id}).exec();
    }
}
