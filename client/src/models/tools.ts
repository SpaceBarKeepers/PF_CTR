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
    { id: 1, name: "Data mapping", icon: "/functionalityFilterIcon/1.svg", value: "data_mapping" },
    { id: 2, name: "Data analysis", icon: "/functionalityFilterIcon/2.svg", value: "data_analysis" },
    { id: 3, name: "Multichannel communication", icon: "/functionalityFilterIcon/3.svg", value: "multichannel_communication" },
    { id: 4, name: "Online mass communication", icon: "/functionalityFilterIcon/4.svg", value: "online_mass_communication" },
    { id: 5, name: "Info Hub", icon: "/functionalityFilterIcon/5.svg", value: "info_hub" },
    { id: 6, name: "Contact management", icon: "/functionalityFilterIcon/6.svg", value: "contact_management" },
    { id: 7, name: "Voting", icon: "/functionalityFilterIcon/7.svg", value: "voting" },
    { id: 8, name: "Survey", icon: "/functionalityFilterIcon/8.svg", value: "survey" },
    { id: 9, name: "Idea gathering", icon: "/functionalityFilterIcon/9.svg", value: "idea_gathering" },
    { id: 10, name: "Co-creation", icon: "/functionalityFilterIcon/10.svg", value: "cocreation" },
    { id: 11, name: "Dialogue", icon: "/functionalityFilterIcon/11.svg", value: "dialogue" },
    { id: 12, name: "Crowdfunding", icon: "/functionalityFilterIcon/12.svg", value: "crowdfunding" },
    { id: 13, name: "Local currency", icon: "/functionalityFilterIcon/13.svg", value: "local_currency" },
    { id: 14, name: "Moderation", icon: "/functionalityFilterIcon/14.svg", value: "moderation" },
    { id: 15, name: "Petition", icon: "/functionalityFilterIcon/15.svg", value: "petition" },
    { id: 16, name: "Hardware", icon: "/functionalityFilterIcon/16.svg", value: "hardware" },
    { id: 17, name: "Future Tech", icon: "/functionalityFilterIcon/17.svg", value: "future_tech" }
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


