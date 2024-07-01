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

interface KnowlegdeLanguageUnit {
    title: string;
    tags: string[];
}

export interface SelectBoxOptionEntity {
    label: string;
    value: string | number | null;
}