import { TagEntity } from './tag';

export interface NewsEntity {
    id: number;
    publishedCs: boolean;
    publishedEn: boolean;
    titleCs: string;
    titleEn: string;
    subtitleCs: string;
    subtitleEn: string;
    contentCs: string;
    contentEn: string;
    thumbnail: string;
    featuredPosition: number | null;
    geoTags: string[];
    interview: boolean;
    caseStudy: boolean;
    tags: TagEntity[];
    createdAt: string;
    updatedAt: string;
}