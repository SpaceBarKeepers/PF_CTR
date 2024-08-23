export interface TagEntity {
    id: number;
    tagEn: string;
    tagCs: string;
}
export const geotagsIntl = [
    { label: 'label_geotag_africa', value: 'africa', defaultMessage: 'Africa' },
    { label: 'label_geotag_asia', value: 'asia', defaultMessage: 'Asia' },
    { label: 'label_geotag_europe', value: 'europe', defaultMessage: 'Europe' },
    { label: 'label_geotag_north_america', value: 'north_america', defaultMessage: 'North America' },
    { label: 'label_geotag_south_america', value: 'south_america', defaultMessage: 'South America' },
    { label: 'label_geotag_middle_east', value: 'middle_east', defaultMessage: 'Middle East' },
    { label: 'label_geotag_aus_nz', value: 'aus_nz', defaultMessage: 'Australia & New Zealand' },
];

export const accessibilityTagsIntl = [
    { label: 'label_atag_people_with_disabilities', value: 'people_with_disabilities', defaultMessage: 'People with disabilities' },
    { label: 'label_atag_hybrid', value: 'hybrid', defaultMessage: 'Hybrid' },
    { label: 'label_atag_low_tech', value: 'low_tech', defaultMessage: 'Low tech' },
    { label: 'label_atag_hybrid_integration', value: 'hybrid_integration', defaultMessage: 'Hybrid integration' },
];

export const socialTagsIntl = [
    { label: 'label_stag_gender_equality', value: 'gender_equality', defaultMessage: 'Gender Equality' },
    { label: 'label_stag_sdgs', value: 'sdgs', defaultMessage: 'SDGs' },
    { label: 'label_stag_inclusion', value: 'inclusion', defaultMessage: 'Inclusion (anti racism, LGBTQIA+ inclusion, women)' },
    { label: 'label_stag_democratic_governance_and_innovation', value: 'democratic_governance_and_innovation', defaultMessage: 'Democratic Governance and Inovation' },
    { label: 'label_stag_sustainable_urban_development', value: 'sustainable_urban_development', defaultMessage: 'Sustainable Urban Development' },
];
