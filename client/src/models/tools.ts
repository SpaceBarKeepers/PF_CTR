export interface ToolEntity {
    id: number;
    toolsName: string;
    logo: string;
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
}

export enum TOOLS_FUNCTIONALITY_ENUM {
    DATA_MAPPING = 'Data mapping',
    DATA_ANALYSIS = 'Data analysis',
    MULTICHANNEL_COMMUNICATION = 'Multichannel communication',
    ONLINE_MASS_COMMUNICATION = 'Online mass communication',
    INFO_HUB = 'Info Hub',
    CONTACT_MANAGEMENT = 'Contact management',
    VOTING = 'Voting',
    SURVEY = 'Survey',
    IDEA_GATHERING = 'Idea gathering',
    CO_CREATION = 'Co-creation',
    DIALOGUE = 'Dialogue',
    CROWDFUNDING = 'Crowdfunding',
    LOCAL_CURRENCY = 'Local currency',
    MODERATION = 'Moderation',
    PETITION = 'Petition',
    HARDWARE = 'Hardware',
    FUTURE_TECH = 'Future Tech'
}

export const functionalityFilterArray = [
    { id: 1, name: "Data mapping", icon: "/functionalityFilterIcon/1.png" },
    { id: 2, name: "Data analysis", icon: "/functionalityFilterIcon/2.png" },
    { id: 3, name: "Multichannel communication", icon: "/functionalityFilterIcon/3.png" },
    { id: 4, name: "Online mass communication", icon: "/functionalityFilterIcon/4.png" },
    { id: 5, name: "Info Hub", icon: "/functionalityFilterIcon/5.png" },
    { id: 6, name: "Contact management", icon: "/functionalityFilterIcon/6.png" },
    { id: 7, name: "Voting", icon: "/functionalityFilterIcon/7.png" },
    { id: 8, name: "Survey", icon: "/functionalityFilterIcon/8.png" },
    { id: 9, name: "Idea gathering", icon: "/functionalityFilterIcon/9.png" },
    { id: 10, name: "Co-creation", icon: "/functionalityFilterIcon/10.png" },
    { id: 11, name: "Dialogue", icon: "/functionalityFilterIcon/11.png" },
    { id: 12, name: "Crowdfunding", icon: "/functionalityFilterIcon/12.png" },
    { id: 13, name: "Local currency", icon: "/functionalityFilterIcon/13.png" },
    { id: 14, name: "Moderation", icon: "/functionalityFilterIcon/14.png" },
    { id: 15, name: "Petition", icon: "/functionalityFilterIcon/15.png" },
    { id: 16, name: "Hardware", icon: "/functionalityFilterIcon/16.png" },
    { id: 17, name: "Future Tech", icon: "/functionalityFilterIcon/17.png" }
];

export const CountryFilterArray = [
    "Albania",
    "Argentina",
    "Austria",
    "Australia",
    "Bosnia and Herzegovina",
    "Belgium",
    "Bermuda",
    "Bolivia",
    "Brazil",
    "Canada",
    "Switzerland",
    "Chile",
    "Colombia",
    "Costa Rica",
    "Cyprus",
    "Czech Republic",
    "Germany",
    "Denmark",
    "Ecuador",
    "Estonia",
    "Spain",
    "Ethiopia",
    "France",
    "Ghana",
    "Greece",
    "Croatia",
    "Israel",
    "Iceland",
    "Italy",
    "Kyrgyzstan",
    "Lebanon",
    "Luxembourg",
    "Latvia",
    "Morocco",
    "Malta",
    "Mexico",
    "Nigeria",
    "Netherlands",
    "Norway",
    "New Zealand",
    "Peru",
    "Poland",
    "Puerto Rico",
    "Portugal",
    "Romania",
    "Serbia",
    "Sudan",
    "Sweden",
    "Slovenia",
    "Slovakia",
    "Somalia",
    "El Salvador",
    "Syria",
    "Thailand",
    "Turkey",
    "Ukraine",
    "Uganda",
    "United Kingdom",
    "USA",
    "Uruguay",
    "Kosovo",
    "Zimbabwe"
];


