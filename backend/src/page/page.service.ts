import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Page } from './entities/page.entity';
import { PageDto } from './dto/page.dto';

@Injectable()
export class PageService {
  constructor(
    @InjectRepository(Page)
    private readonly pageRepository: Repository<Page>,
  ) {}

  async findOne(id: string): Promise<Page | null> {
    return this.pageRepository.findOneBy({ id });
  }

  async update(news: PageDto) {
    const updatedPage = {
      updatedAt: Date.now(),
      ...news,
    };
    return this.pageRepository.save(updatedPage);
  }
}
