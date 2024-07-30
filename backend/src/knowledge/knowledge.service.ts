import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { KnowledgeBase } from './entities/knowledge.entity';
import { KnowledgeDto } from './dto/knowledge.dto';

@Injectable()
export class KnowledgeService {
  constructor(
    @InjectRepository(KnowledgeBase)
    private readonly knowledgeRepository: Repository<KnowledgeBase>,
  ) {}

  async pushDownFeaturedPosition(position: number) {
    const knowledge = await this.knowledgeRepository.find();
    if (!knowledge.find((k) => k.featuredPosition === position)) return;

    for (let i = 0; i < knowledge.length; i++) {
      if (knowledge[i].featuredPosition) {
        if (knowledge[i].featuredPosition! >= position) {
          if (knowledge[i].featuredPosition === 4) {
            knowledge[i].featuredPosition = null;
          } else {
            knowledge[i].featuredPosition! += 1;
          }
        }
        await this.knowledgeRepository.save(knowledge[i]);
      }
    }
  }

  async create(knowledge: KnowledgeDto) {
    const createdKnowledge = new KnowledgeBase();
    createdKnowledge.publishedCs = knowledge.publishedCs;
    createdKnowledge.titleCs = knowledge.titleCs;
    createdKnowledge.subtitleCs = knowledge.subtitleCs;
    createdKnowledge.contentCs = knowledge.contentCs;
    createdKnowledge.publishedEn = knowledge.publishedEn;
    createdKnowledge.titleEn = knowledge.titleEn;
    createdKnowledge.subtitleEn = knowledge.subtitleEn;
    createdKnowledge.contentEn = knowledge.contentEn;
    createdKnowledge.thumbnail = knowledge.thumbnail;
    createdKnowledge.featuredPosition = knowledge.featuredPosition;
    createdKnowledge.createdAt = new Date();
    createdKnowledge.updatedAt = new Date();

    if (knowledge.featuredPosition) {
      await this.pushDownFeaturedPosition(knowledge.featuredPosition);
    }
    return this.knowledgeRepository.save(createdKnowledge);
  }

  async findAll(): Promise<KnowledgeBase[]> {
    return await this.knowledgeRepository.find();
  }

  async findOne(id: number): Promise<KnowledgeBase | null> {
    return this.knowledgeRepository.findOneBy({ id });
  }

  async update(id: number, knowledge: KnowledgeDto): Promise<UpdateResult> {
    const newKnowledge = {
      createdAt: undefined,
      updatedAt: Date.now(),
      ...knowledge,
    };
    if (knowledge.featuredPosition) {
      await this.pushDownFeaturedPosition(knowledge.featuredPosition);
    }
    return this.knowledgeRepository.update({ id: id }, newKnowledge);
  }

  delete(id: number) {
    return this.knowledgeRepository.delete({ id });
  }
}
