import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FeedDto } from './dto/feed.dto';
import { Feed } from './entities/feed.entity';

@Injectable()
export class FeedService {
  constructor(
    @InjectRepository(Feed)
    private readonly feedRepository: Repository<Feed>,
  ) {}

  async create(event: FeedDto) {
    const createdFeed = new Feed();
    createdFeed.date = event.date;
    createdFeed.titleCs = event.titleCs;
    createdFeed.titleEn = event.titleEn;
    createdFeed.url = event.url;

    return this.feedRepository.save(createdFeed);
  }

  async findAll(): Promise<Feed[]> {
    return await this.feedRepository.find();
  }

  async findOne(id: number): Promise<Feed | null> {
    return this.feedRepository.findOneBy({ id });
  }

  async update(event: FeedDto) {
    return this.feedRepository.save(event);
  }

  delete(id: number) {
    return this.feedRepository.delete({ id });
  }
}
