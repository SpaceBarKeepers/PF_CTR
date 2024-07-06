import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { News } from './entities/news.entity';
import { NewsDto } from './dto/news.dto';

@Injectable()
export class NewsService {
    constructor(
        @InjectRepository(News)
        private readonly newsRepository: Repository<News>,
    ) {}

    async pushDownFeaturedPosition(position: number) {
        const knowledge = await this.newsRepository.find();
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
                await this.newsRepository.save(knowledge[i]);
            }
        }
    }

    async create(news: NewsDto) {
        const createdNews = new News();
        createdNews.publishedCs = news.publishedCs;
        createdNews.titleCs = news.titleCs;
        createdNews.subtitleCs = news.subtitleCs;
        createdNews.contentCs = news.contentCs;
        createdNews.publishedEn = news.publishedEn;
        createdNews.titleEn = news.titleEn;
        createdNews.subtitleEn = news.subtitleEn;
        createdNews.contentEn = news.contentEn;
        createdNews.thumbnail = news.thumbnail;
        createdNews.featuredPosition = news.featuredPosition;
        createdNews.tags = news.tags;
        createdNews.geotags = news.geotags;
        createdNews.interview = news.interview;
        createdNews.caseStudy = news.caseStudy;
        createdNews.createdAt = new Date();
        createdNews.updatedAt = new Date();

        if (news.featuredPosition) {
            await this.pushDownFeaturedPosition(news.featuredPosition);
        }
        return this.newsRepository.save(createdNews);
    }

    async findAll(): Promise<News[]> {
        return await this.newsRepository.find();
    }

    async findOne(id: number): Promise<News | null> {
        return this.newsRepository.findOneBy({ id });
    }

    async update(id: number, news: NewsDto): Promise<UpdateResult> {
        const newNews = {
            createdAt: undefined,
            updatedAt: Date.now(),
            ...news,
        };
        if (news.featuredPosition) {
            await this.pushDownFeaturedPosition(news.featuredPosition);
        }
        return this.newsRepository.save(newNews);
    }

    delete(id: number) {
        return this.newsRepository.delete({ id });
    }
}
