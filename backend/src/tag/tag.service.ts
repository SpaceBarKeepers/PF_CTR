import {Injectable} from '@nestjs/common';
import { Tag } from './entities/tag.entity';
import { TagDto } from './dto/tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TagService {
  constructor(@InjectRepository(Tag)
              private readonly tagRepository: Repository<Tag>,) {}

  async create(tag: TagDto) {
    const createdTag = new Tag();
    createdTag.tagEn = tag.tagEn;
    createdTag.tagCs = tag.tagCs;
    return this.tagRepository.save(createdTag);
  }

  async findAll(): Promise<Tag[]> {
    return await this.tagRepository.find();
  }

  delete(id: number) {
    return this.tagRepository.delete({ id });
  }
}
