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

export interface PageEntity {
    id: string;
    contentEn: string;
    contentCs: string;
}

export interface EventEntity {
    id: string;
    publishedCs: boolean;
    titleCs: string;
    publishedEn: boolean;
    titleEn: string;
    eventAt: string;
    eventTimeAt: string;
    location: string;
}

export interface EventInterface {
    publishedCs: boolean;
    titleCs: string;
    publishedEn: boolean;
    titleEn: string;
    eventAt: Date;
    eventTimeAt: string;
    location: string;
}

export interface ToolEntity {
    id: string;
    toolsName: string;
    descEn: string;
    descCS: string;
    featuresEn: string[];
    featuresCs: string[];
    dataProtectionEn: string;
    dataProtectionCs: string;
    authenticationEn: string;
    authenticationCs: string;
    nextProductUpdateEn: string;
    nextProductUpdateCs: string;
    feedEn: string[];
    feedCs: string[];
    accessibilityTag: string[];
    established: string;
    noOfClients: string;
    team: string;
    email: string;
    phone: string;
    web: string;
    countries: string[];
    partners: string;
    socialPositioningTag: string[];
    featureTag: string[];
    similarTools: ToolEntity[];
    caseStudyOnePublishedEn: boolean;
    caseStudyOneTitleEn: string;
    caseStudyOneImgEn: string;
    caseStudyOneDescEn: string;
    caseStudyOneHighlightOneEn: string;
    caseStudyOneHighlightTwoEn: string;
    caseStudyOneHighlightThreeEn: string;
    caseStudyOneHighlightFourEn: string;
    caseStudyOnePublishedCs: boolean;
    caseStudyOneTitleCs: string;
    caseStudyOneImgCs: string;
    caseStudyOneDescCs: string;
    caseStudyOneHighlightOneCs: string;
    caseStudyOneHighlightTwoCs: string;
    caseStudyOneHighlightThreeCs: string;
    caseStudyOneHighlightFourCs: string;
    caseStudyTwoPublishedEn: boolean;
    caseStudyTwoTitleEn: string;
    caseStudyTwoImgEn: string;
    caseStudyTwoDescEn: string;
    caseStudyTwoHighlightOneEn: string;
    caseStudyTwoHighlightTwoEn: string;
    caseStudyTwoHighlightThreeEn: string;
    caseStudyTwoHighlightFourEn: string;
    caseStudyTwoPublishedCs: boolean;
    caseStudyTwoTitleCs: string;
    caseStudyTwoImgCs: string;
    caseStudyTwoDescCs: string;
    caseStudyTwoHighlightOneCs: string;
    caseStudyTwoHighlightTwoCs: string;
    caseStudyTwoHighlightThreeCs: string;
    caseStudyTwoHighlightFourCs: string;
}

export interface ToolInterface {
    toolsName: string;
    descEn: string;
    descCS: string;
    featuresEn: string[];
    featuresCs: string[];
    dataProtectionEn: string;
    dataProtectionCs: string;
    authenticationEn: string;
    authenticationCs: string;
    nextProductUpdateEn: string;
    nextProductUpdateCs: string;
    feedEn: string[];
    feedCs: string[];
    established: string;
    noOfClients: string;
    team: string;
    email: string;
    phone: string;
    web: string;
    countries: string[];
    partners: string;
    accessibilityTag: string[];
    socialPositioningTag: string[];
    featureTag: string[];
    similarTools: ToolEntity[];
    caseStudyOnePublishedEn: boolean;
    caseStudyOneTitleEn: string;
    caseStudyOneImgEn: string;
    caseStudyOneDescEn: string;
    caseStudyOneHighlightOneEn: string;
    caseStudyOneHighlightTwoEn: string;
    caseStudyOneHighlightThreeEn: string;
    caseStudyOneHighlightFourEn: string;
    caseStudyOnePublishedCs: boolean;
    caseStudyOneTitleCs: string;
    caseStudyOneImgCs: string;
    caseStudyOneDescCs: string;
    caseStudyOneHighlightOneCs: string;
    caseStudyOneHighlightTwoCs: string;
    caseStudyOneHighlightThreeCs: string;
    caseStudyOneHighlightFourCs: string;
    caseStudyTwoPublishedEn: boolean;
    caseStudyTwoTitleEn: string;
    caseStudyTwoImgEn: string;
    caseStudyTwoDescEn: string;
    caseStudyTwoHighlightOneEn: string;
    caseStudyTwoHighlightTwoEn: string;
    caseStudyTwoHighlightThreeEn: string;
    caseStudyTwoHighlightFourEn: string;
    caseStudyTwoPublishedCs: boolean;
    caseStudyTwoTitleCs: string;
    caseStudyTwoImgCs: string;
    caseStudyTwoDescCs: string;
    caseStudyTwoHighlightOneCs: string;
    caseStudyTwoHighlightTwoCs: string;
    caseStudyTwoHighlightThreeCs: string;
    caseStudyTwoHighlightFourCs: string;
}

export interface CreateUserInterface {
    username: string;
    name: string;
    organization: string;
    phone: string;
    address: string;
    shippingCode: string;
}

export interface FeedEntity {
    id: string;
    titleCs: string;
    titleEn: string;
    date: string;
    url: string;
}