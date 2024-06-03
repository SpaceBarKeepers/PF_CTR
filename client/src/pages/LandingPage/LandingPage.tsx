import LayoutPublicWrapper from '../../wrappers/LayoutPublicWrapper';
import { FLAG_PRESALE } from '../../dev_flags';
import { FormattedMessage, useIntl } from 'react-intl';
import ButtonColored from '../../components/Button/ButtonColored';
import './landingPage.scss';
import { languageAtom } from '../../atomStore';
import { useAtomValue } from 'jotai/index';
import { LANGUAGE_ENUM } from '../../models/enums';
import LandingPageCard from '../../components/LandingPageCard/LandingPageCard';
import LandingPagePricingCard from '../../components/LandingPagePricingCard/LandingPagePricingCard';
import FaqRow from '../../components/FaqRow/FaqRow';

const LandingPage = () => {
    const language = useAtomValue(languageAtom);
    const intl = useIntl();

    return (
        <LayoutPublicWrapper>
            <div className={'landingPage'}>

                <section className={'landingPage__hero'}>
                    <h1>Civic Tech Market Report 2025</h1>
                    <p>{FLAG_PRESALE
                        ? <FormattedMessage
                            id={'text_hero_presale'}
                            defaultMessage={'Explore major trends that are currently shaping the field of digital participation. Get access to the insights from top-tear industry experts and gain a perfect overview of the European Civic Tech ecosystem and detailed information about over 80 solutions with accompanying case studies. Sign up now to pre-order your copy of Civic Tech Market Report 2025 for the early-bird price!'}
                        />
                        : <FormattedMessage
                            id={'text_hero'}
                            defaultMessage={'Explore major trends that are currently shaping the field of digital participation. Get access to the insights from top-tear industry experts and gain a perfect overview of the European Civic Tech ecosystem and detailed information about over 80 solutions with accompanying case studies.'}
                        />
                    }</p>
                    <ButtonColored size={'large'}>
                        <a href={'#pricingSection'}>
                            {FLAG_PRESALE
                                ? <FormattedMessage id={'label_preorder'} defaultMessage={'Pre-order'} />
                                : <FormattedMessage id={'label_get_your_copy'} defaultMessage={'Get your copy'} />
                            }

                        </a>
                    </ButtonColored>
                </section>

                <section className={'landingPage__about'} id={'aboutSection'}>
                    <h2>
                        <FormattedMessage id={'label_about_the_report'} defaultMessage={'About the report'} />
                    </h2>
                    <p>
                        <FormattedMessage
                            id={'text_about_report'}
                            defaultMessage={'Through our extensive experience with participatory projects from all over the world combined with years of thorough research, we bring you the most comprehensive guide on digital participation and Civic Tech tools that are available on the European market. By obtaining the Report, you will get an artistically-designed hard copy of the book for your bookshelf along with an access to online Civic Tech Market Report platform with regular news and product updates for easy browsing through the catalogue of tools and accompanying depository of knowledge.'}
                        />
                    </p>
                    <img
                        src={'/images/landing_about.png'}
                        alt={language === LANGUAGE_ENUM.CS ? 'obrázek produktu' : 'report image'}
                    />
                </section>

                <section className={'landingPage__whatsInside'} id={'whatsInsideSection'}>
                    <h2>
                        <FormattedMessage id={'label_whats_inside'} defaultMessage={'What\'s inside'} />
                    </h2>
                    <img
                        src={'/images/landing_inside.svg'}
                        alt={language === LANGUAGE_ENUM.CS ? 'obrázek obsahu reportu' : 'report content image'}
                    />
                </section>

                <section className={'landingPage__whoFor'} id={'whoForSection'}>
                    <h2>
                        <FormattedMessage id={'label_who_for'} defaultMessage={'Who is it for'} />
                    </h2>
                    <div className={'landingPage__whoForContainer'}>
                        <LandingPageCard
                            image={'/images/landing_whoFor1.png'}
                            heading={intl.formatMessage({
                                id: 'label_who_for1',
                                defaultMessage: 'Local and regional governments',
                            })}
                            text={intl.formatMessage({
                                id: 'text_who_for1',
                                defaultMessage: 'Lorem ipsum dolor sit amet consectetur. Vitae in in ultrices enim scelerisque fusce.',
                            })}
                        />
                        <LandingPageCard
                            image={'/images/landing_whoFor2.png'}
                            heading={intl.formatMessage({
                                id: 'label_who_for2',
                                defaultMessage: 'National governments',
                            })}
                            text={intl.formatMessage({
                                id: 'text_who_for2',
                                defaultMessage: 'Lorem ipsum dolor sit amet consectetur. Vitae in in ultrices enim scelerisque fusce.',
                            })
                            }
                        />
                        <LandingPageCard
                            image={'/images/landing_whoFor3.png'}
                            heading={intl.formatMessage({
                                id: 'label_who_for3',
                                defaultMessage: 'Civic Tech companies',
                            })}
                            text={intl.formatMessage({
                                id: 'text_who_for3',
                                defaultMessage: 'Lorem ipsum dolor sit amet consectetur. Vitae in in ultrices enim scelerisque fusce.',
                            })}
                        />
                        <LandingPageCard
                            image={'/images/landing_whoFor4.png'}
                            heading={intl.formatMessage({
                                id: 'label_who_for4',
                                defaultMessage: 'Participation consultants',
                            })}
                            text={intl.formatMessage({
                                id: 'text_who_for4',
                                defaultMessage: 'Lorem ipsum dolor sit amet consectetur. Vitae in in ultrices enim scelerisque fusce.',
                            })}
                        />
                    </div>
                </section>

                <section className={'landingPage__whatYouGet'} id={'whatYouGetSection'}>
                    <h2>
                        <FormattedMessage id={'label_what_you_get'} defaultMessage={'What you get'} />
                    </h2>
                    <div className={'landingPage__whatYouGetContainer'}>
                        <LandingPageCard
                            image={'/images/landing_whatYouGet1.png'}
                            heading={intl.formatMessage({
                                id: 'label_what_you_get1',
                                defaultMessage: 'Hard copy of book',
                            })}
                            text={intl.formatMessage({
                                id: 'text_what_you_get1',
                                defaultMessage: 'Lorem ipsum dolor sit amet consectetur. Vitae in in ultrices enim scelerisque fusce.',
                            })}
                        />
                        <LandingPageCard
                            image={'/images/landing_whatYouGet2.png'}
                            heading={intl.formatMessage({
                                id: 'label_what_you_get2',
                                defaultMessage: 'Access to online platform',
                            })}
                            text={intl.formatMessage({
                                id: 'text_what_you_get2',
                                defaultMessage: 'Lorem ipsum dolor sit amet consectetur. Vitae in in ultrices enim scelerisque fusce.',
                            })}
                        />
                        <LandingPageCard
                            image={'/images/landing_whatYouGet3.png'}
                            heading={intl.formatMessage({
                                id: 'label_what_you_get3',
                                defaultMessage: 'Regular updates and news',
                            })}
                            text={intl.formatMessage({
                                id: 'text_what_you_get3',
                                defaultMessage: 'Lorem ipsum dolor sit amet consectetur. Vitae in in ultrices enim scelerisque fusce.',
                            })}
                        />
                    </div>
                </section>

                <section className={'landingPage__pricing'} id={'pricingSection'}>
                    <h2>
                        <FormattedMessage id={'label_pricing'} defaultMessage={'Pricing'} />
                    </h2>
                    <div className={'landingPage__pricingContainer'}>
                        <LandingPagePricingCard
                            title={intl.formatMessage({ id: 'label_pricing1', defaultMessage: 'Individual bundle' })}
                            options={[
                                intl.formatMessage({
                                    id: 'text_pricing1_1',
                                    defaultMessage: 'Personalised hard copy of the Report delivered to you',
                                }),
                                intl.formatMessage({
                                    id: 'text_pricing1_2',
                                    defaultMessage: 'Access to the online platform for 1 person for the 2025 edition of the Report',
                                }),
                                intl.formatMessage({
                                    id: 'text_pricing1_3',
                                    defaultMessage: 'Regular news, updates, and expert articles available on the platform',
                                }),
                            ]}
                        >
                            <ButtonColored>
                                <a href={'#'}>
                                    <FormattedMessage id={'label_preorder'} defaultMessage={'Pre-order'} />
                                </a>
                            </ButtonColored>
                        </LandingPagePricingCard>
                        <LandingPagePricingCard
                            title={intl.formatMessage({ id: 'label_pricing2', defaultMessage: 'Participation bundle' })}
                            options={[
                                <span>
                                <a href={'https://participatepractically.com'}>Participate Practically</a>
                                    {' '}
                                    {intl.formatMessage({
                                        id: 'text_pricing2_1',
                                        defaultMessage: 'online course for 1 person',
                                    })}</span>,
                                intl.formatMessage({
                                    id: 'text_pricing2_2',
                                    defaultMessage: 'Personalised hard copy of the Report delivered to you',
                                }),
                                intl.formatMessage({
                                    id: 'text_pricing2_3',
                                    defaultMessage: 'Access to the online platform for 1 person for the 2025 edition of the Report',
                                }),
                                intl.formatMessage({
                                    id: 'text_pricing2_4',
                                    defaultMessage: 'Regular news, updates, and expert articles available on the platform',
                                }),
                            ]}
                        >
                            <ButtonColored>
                                <a href={'#'}>
                                    <FormattedMessage id={'label_preorder'} defaultMessage={'Pre-order'} />
                                </a>
                            </ButtonColored>
                        </LandingPagePricingCard>
                        <LandingPagePricingCard
                            title={intl.formatMessage({ id: 'label_pricing3', defaultMessage: 'Team bundle' })}
                            options={[
                                intl.formatMessage({
                                    id: 'text_pricing3_1',
                                    defaultMessage: 'Team/group discount if obtained for 3 or more people',
                                }),
                                intl.formatMessage({
                                    id: 'text_pricing3_2',
                                    defaultMessage: 'Multiple personalised hard copies of the Report',
                                }),
                                intl.formatMessage({
                                    id: 'text_pricing3_3',
                                    defaultMessage: 'Access to the online platform for multiple people for the 2025 edition of the Report',
                                }),
                                intl.formatMessage({
                                    id: 'text_pricing3_4',
                                    defaultMessage: 'Regular news, updates, and expert articles available on the platform',
                                }),
                            ]}
                        >
                            <ButtonColored>
                                <a href={'#'}>
                                    <FormattedMessage id={'label_preorder'} defaultMessage={'Pre-order'} />
                                </a>
                            </ButtonColored>
                        </LandingPagePricingCard>
                    </div>
                </section>

                <section className={'landingPage__faq'} id={'faqSection'}>
                    <h2>
                        <FormattedMessage id={'label_faq'} defaultMessage={'FAQ'} />
                    </h2>
                    <div className={'landingPage__faqContainer'}>
                        <FaqRow
                            question={intl.formatMessage({
                                id: 'text_faq1_question',
                                defaultMessage: 'Can I obtain the hard copy only or the online platform only?',
                            })}
                            answer={intl.formatMessage({
                                id: 'text_faq1_answer',
                                defaultMessage: 'At the moment, we offer the Report only as a bundle with hard copy and online platform together. We want our artistically designed and crafted Report to become a valuable addition to your bookshelf. Yet at the same time we would like to offer you a convenient way to browse through the database.',
                            })}
                        />
                        <FaqRow
                            question={intl.formatMessage({
                                id: 'text_faq2_question',
                                defaultMessage: 'How does the online platform work?',
                            })}
                            answer={intl.formatMessage({
                                id: 'text_faq2_answer',
                                defaultMessage: 'Once you purchase the access, you will receive login details to your e-mail.',
                            })}
                        />
                        <FaqRow
                            question={intl.formatMessage({
                                id: 'text_faq3_question',
                                defaultMessage: 'Can I share the online platform with someone else?',
                            })}
                            answer={intl.formatMessage({
                                id: 'text_faq3_answer',
                                defaultMessage: 'Each purchase grants access to one user only. For the teams of more people, reach out to us for a group discount.',
                            })}
                        />
                        <FaqRow
                            question={intl.formatMessage({
                                id: 'text_faq4_question',
                                defaultMessage: 'How long will the online platform be accessible?',
                            })}
                            answer={intl.formatMessage({
                                id: 'text_faq4_answer',
                                defaultMessage: 'The access is granted for one year/2024 edition of the report with regular updates of the data, news and premium content that is not available in hard copy of the Report.',
                            })}
                        />
                        <FaqRow
                            question={intl.formatMessage({
                                id: 'text_faq4_question',
                                defaultMessage: 'I want to get access to the online platform for our office. Is there any discount?',
                            })}
                            answer={intl.formatMessage({
                                id: 'text_faq4_answer',
                                defaultMessage: 'Absolutely. Contact us regarding your needs and we will give you a special price if you need access for the team of three or more people.',
                            })}
                        />
                    </div>
                </section>
            </div>
        </LayoutPublicWrapper>
    );
};

export default LandingPage;
