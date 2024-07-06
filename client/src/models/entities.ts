export interface TokenEntity {
  access_token: string;
}

export interface TokenAdminEntity {
  admin_token: string;
}

export interface UserAPIEntity {
    _id: string;
    username: string;
    activeDevice: string;
}

export interface UserEntity {
    id: number;
    username: string;
    activeDevice: string;
    registered: Date;
    registrationType: "manual" | "paygate";
    lastLogin: Date;
}

interface KnowlegdeLanguageUnit {
    title: string;
    tags: string[];
}

export interface SelectBoxOptionEntity {
    label: string;
    value: string | number | null;
}

export interface KnowledgeBaseInterface {
    publishedCs: boolean;
    titleCs: string;
    subtitleCs: string;
    contentCs: string;
    publishedEn: boolean;
    titleEn: string;
    subtitleEn: string;
    featuredPosition: number;
    contentEn: string;
    thumbnail: string;
}

export interface KnowledgeEntity {
    id: string;
    publishedCs: boolean;
    titleCs: string;
    subtitleCs: string;
    contentCs: string;
    publishedEn: boolean;
    titleEn: string;
    subtitleEn: string;
    contentEn: string;
    featuredPosition: number;
    thumbnail: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface NewsInterface {
    publishedCs: boolean;
    titleCs: string;
    subtitleCs: string;
    contentCs: string;
    publishedEn: boolean;
    titleEn: string;
    subtitleEn: string;
    featuredPosition: number;
    contentEn: string;
    thumbnail: string;
    tags: TagEntity[];
    geotags: string[];
    interview: boolean;
    caseStudy: boolean;
}

export interface NewsEntity {
    id: string;
    publishedCs: boolean;
    titleCs: string;
    subtitleCs: string;
    contentCs: string;
    publishedEn: boolean;
    titleEn: string;
    subtitleEn: string;
    contentEn: string;
    featuredPosition: number;
    thumbnail: string;
    tags: string[];
    geotags: string[];
    interview: boolean;
    caseStudy: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface TagInterface {
    tagEn: string;
    tagCs: string;
}

export interface TagEntity {
    id: number;
    tagEn: string;
    tagCs: string;
}