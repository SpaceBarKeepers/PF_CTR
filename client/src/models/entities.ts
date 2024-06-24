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

export interface KnowledgeAPIEntity {
    _id: string;
    cs?: KnowlegdeLanguageUnit;
    en?: KnowlegdeLanguageUnit;
    tags: string[];
    createdAt: number;
    updatedAt: number;
}

export interface KnowledgeEntity {
    id: string;
    cs?: KnowlegdeLanguageUnit;
    en?: KnowlegdeLanguageUnit;
    tags: string[];
    createdAt: number;
    updatedAt: number;
}

interface KnowlegdeLanguageUnit {
    title: string;
    tags: string[];
}
