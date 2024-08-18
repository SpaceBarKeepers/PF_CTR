export interface KnowledgeBaseEntity {
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
    content: string;
    featuredPosition: number | null;
    createdAt: string;
    updatedAt: string;
}