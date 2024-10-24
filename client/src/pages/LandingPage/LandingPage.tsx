import LayoutPublicWrapper from '../../wrappers/LayoutPublicWrapper';
import { FormattedMessage, useIntl } from 'react-intl';
import ButtonColored from '../../components/Button/ButtonColored';
import './landingPage.scss';
import { languageAtom } from '../../atomStore';
import { useAtomValue } from 'jotai/index';
import { LANGUAGE_ENUM } from '../../models/enums';
import LandingPageCard from '../../components/LandingPageCard/LandingPageCard';
import FaqRow from '../../components/FaqRow/FaqRow';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const LandingPage = () => {
    const [scrollButtonVisible, setScrollButtonVisible] = useState(false);
    const language = useAtomValue(languageAtom);
    const intl = useIntl();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            if (scrollPosition < 30) {
                setScrollButtonVisible(false);
            } else {
                setScrollButtonVisible(true);
            }
        };

        // Add event listener for scrolling
        window.addEventListener('scroll', handleScroll);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleClickUp = () => {
        window.scrollTo(0,0);
    }

    return (
        <LayoutPublicWrapper>
            <div className={'landingPage'}>
                {scrollButtonVisible && <div className={'landingPage__clickUp'} onClick={handleClickUp}>
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                       fill="#FFFFFF">
                    <path d="M440-160v-487L216-423l-56-57 320-320 320 320-56 57-224-224v487h-80Z" />
                  </svg>
                </div>}
                <img className={'wormhole'} src={'/images/landing_wormhole.png'} alt={'logo Participation Factory'} />
                <section className={'landingPage__hero'}>
                <h1>Civic Tech Market Report 2025</h1>
                    <p>
                        <FormattedMessage
                            id={'text_hero'}
                            defaultMessage={'Explore major trends that are currently shaping the field of digital participation. Get access to the insights from top-tear industry experts and gain a perfect overview of the European Civic Tech ecosystem and detailed information about over 80 solutions with accompanying case studies. Get your copy of Civic Tech Market Report 2025 and become a part of the digital participation community of practitioners and experts!'}
                        />
                    </p>
                    <ButtonColored size={'large'}>
                        <a href={'#pricingSection'}>
                            {/*<FormattedMessage id={'label_preorder'} defaultMessage={'Pre-order'} />*/}
                            <FormattedMessage id={'label_buy'} defaultMessage={'Buy now'} />
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
                            imageType={'icon'}
                            heading={intl.formatMessage({
                                id: 'label_who_for1',
                                defaultMessage: 'Local and regional governments',
                            })}
                            text={intl.formatMessage({
                                id: 'text_who_for1',
                                defaultMessage: 'Find the right tools for your participatory processes, write better tenders, improve your digital strategy, and educate your team.',
                            })}
                        />
                        <LandingPageCard
                            image={'/images/landing_whoFor2.png'}
                            imageType={'icon'}
                            heading={intl.formatMessage({
                                id: 'label_who_for2',
                                defaultMessage: 'National governments',
                            })}
                            text={intl.formatMessage({
                                id: 'text_who_for2',
                                defaultMessage: 'Identify digital solutions for systemic participation, and support participation initiatives in regions.',
                            })
                            }
                        />
                        <LandingPageCard
                            image={'/images/landing_whoFor3.png'}
                            imageType={'icon'}
                            heading={intl.formatMessage({
                                id: 'label_who_for3',
                                defaultMessage: 'Civic Tech companies',
                            })}
                            text={intl.formatMessage({
                                id: 'text_who_for3',
                                defaultMessage: 'Explore the market, identify your competition, learn about current trends, and find new use cases for your tool.',
                            })}
                        />
                        <LandingPageCard
                            image={'/images/landing_whoFor4.png'}
                            imageType={'icon'}
                            heading={intl.formatMessage({
                                id: 'label_who_for4',
                                defaultMessage: 'Participation consultants',
                            })}
                            text={intl.formatMessage({
                                id: 'text_who_for4',
                                defaultMessage: 'Learn about the best practices in digital participation and bring higher value to your clients.',
                            })}
                        />
                        <LandingPageCard
                            image={'/images/landing_whoFor5.png'}
                            imageType={'icon'}
                            heading={intl.formatMessage({
                                id: 'label_who_for5',
                                defaultMessage: 'NGOs',
                            })}
                            text={intl.formatMessage({
                                id: 'text_who_for5',
                                defaultMessage: 'Find out how to run a digital participatory project and select the tool that fits your resources.',
                            })}
                        />
                        <LandingPageCard
                            image={'/images/landing_whoFor6.png'}
                            imageType={'icon'}
                            heading={intl.formatMessage({
                                id: 'label_who_for6',
                                defaultMessage: 'Architects and real estate',
                            })}
                            text={intl.formatMessage({
                                id: 'text_who_for6',
                                defaultMessage: 'Select the right digital solution for public space and urban development projects and enhance your community engagement process.',
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
                                defaultMessage: 'Over 250 pages of expert information about Civic Tech in an artistically-designed book edition suited for your bookshelf.',
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
                                defaultMessage: 'Easy-to-use online platform with an interactive catalogue of Civic Tech tools, all the content from the book, and some additional updates.',
                            })}
                        />
                        <LandingPageCard
                            image={'/images/landing_whatYouGet3.png'}
                            heading={intl.formatMessage({
                                id: 'label_what_you_get3',
                                defaultMessage: 'News and product updates',
                            })}
                            text={intl.formatMessage({
                                id: 'text_what_you_get3',
                                defaultMessage: 'Latest news from the Civic Tech industry, expert interviews, innovation updates, case studies, and much more available on the online platform.',
                            })}
                        />
                    </div>
                </section>

                <section className={'landingPage__pricing'} id={'pricingSection'}>
                    <h2>
                        <FormattedMessage id={'label_pricing'} defaultMessage={'Pricing'} />
                    </h2>
                    <div className={'landingPage__pricingContainer'}>
                        <table>
                            <colgroup>
                                <col />
                                <col />
                                <col />
                                <col />
                            </colgroup>
                            <thead>
                            <tr>
                                <th className={'borderBottom borderRight sticky'}></th>
                                <th className={'borderBottom borderRight center'}>
                                    <FormattedMessage
                                        id={'label_pricing1'}
                                        defaultMessage={'Digital Access'}
                                    />
                                </th>
                                <th className={'borderBottom borderRight center'}>
                                    <FormattedMessage
                                        id={'label_pricing2'}
                                        defaultMessage={'Digital Access and Printed Report'}
                                    />
                                </th>
                                <th className={'borderBottom borderRight center'}>
                                    <FormattedMessage
                                        id={'label_pricing3'}
                                        defaultMessage={'Participate Practically Bundle'}
                                    />
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr className={'blackRow'}>
                                <td></td>
                                <td>250 EUR</td>
                                <td>590 EUR</td>
                                <td>890 EUR</td>
                            </tr>
                            <tr>
                                <td className={'borderBottom borderRight sticky'}>
                                    <b>
                                        <FormattedMessage
                                            id={'text_pricing_row1_title'}
                                            defaultMessage={'Access to the online platform for the 2025 edition of the Report'}
                                        />
                                    </b>
                                </td>
                                <td className={'borderBottom borderRight center'}>
                                    <img src={'/icons/icon_check_black.svg'} alt={'checkmark'} />
                                </td>
                                <td className={'borderBottom borderRight center'}>
                                    <img src={'/icons/icon_check_black.svg'} alt={'checkmark'} />
                                </td>
                                <td className={'borderBottom borderRight center'}>
                                    <img src={'/icons/icon_check_black.svg'} alt={'checkmark'} />
                                </td>
                            </tr>
                            <tr>
                                <td className={'borderBottom borderRight sticky'}>
                                    <b>
                                        <FormattedMessage
                                            id={'text_pricing_row2_title'}
                                            defaultMessage={'Regular news, updates, and expert articles available on the platform'}
                                        />
                                    </b>
                                </td>
                                <td className={'borderBottom borderRight center'}>
                                    <img src={'/icons/icon_check_black.svg'} alt={'checkmark'} />
                                </td>
                                <td className={'borderBottom borderRight center'}>
                                    <img src={'/icons/icon_check_black.svg'} alt={'checkmark'} />
                                </td>
                                <td className={'borderBottom borderRight center'}>
                                    <img src={'/icons/icon_check_black.svg'} alt={'checkmark'} />
                                </td>
                            </tr>
                            <tr>
                                <td className={'borderBottom borderRight sticky'}>
                                    <b>
                                        <FormattedMessage
                                            id={'text_pricing_row3_title'}
                                            defaultMessage={'Personalised hard copy of the Report'}
                                        />
                                    </b>
                                </td>
                                <td className={'borderBottom borderRight center'}>
                                    <img src={'/icons/icon_cross_black.svg'} alt={'checkmark'} />
                                </td>
                                <td className={'borderBottom borderRight center'}>
                                    <img src={'/icons/icon_check_black.svg'} alt={'checkmark'} />
                                </td>
                                <td className={'borderBottom borderRight center'}>
                                    <img src={'/icons/icon_check_black.svg'} alt={'checkmark'} />
                                </td>
                            </tr>
                            <tr>
                                <td className={'borderBottom borderRight sticky'}>
                                    <b>
                                        <a className={'tableLink'} href={'https://participatepractically.com'}>Participate
                                            Practically</a>
                                        {' '}
                                        <FormattedMessage
                                            id={'text_pricing_row4_title'}
                                            defaultMessage={'online course for 1 person'}
                                        />
                                    </b>
                                </td>
                                <td className={'borderBottom borderRight center'}>
                                    <img src={'/icons/icon_cross_black.svg'} alt={'checkmark'} />
                                </td>
                                <td className={'borderBottom borderRight center'}>
                                    <img src={'/icons/icon_cross_black.svg'} alt={'checkmark'} />
                                </td>
                                <td className={'borderBottom borderRight center'}>
                                    <img src={'/icons/icon_check_black.svg'} alt={'checkmark'} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                </td>
                                <td className={'buttonCell'}>
                                    <ButtonColored>
                                        <Link to={'/order/digital'}>
                                            <FormattedMessage id={'label_buy'} defaultMessage={'Buy now'} />
                                        </Link>
                                    </ButtonColored>
                                </td>
                                <td className={'buttonCell'}>
                                    <ButtonColored>
                                        <Link to={'/order/printed'}>
                                            <FormattedMessage id={'label_buy'} defaultMessage={'Buy now'} />
                                        </Link>
                                    </ButtonColored>
                                </td>
                                <td className={'buttonCell'}>
                                    <ButtonColored>
                                        <Link to={'/order/bundle'}>
                                            <FormattedMessage id={'label_buy'} defaultMessage={'Buy now'} />
                                        </Link>
                                    </ButtonColored>
                                </td>
                            </tr>
                            </tbody>
                        </table>
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
                                defaultMessage: 'You have the flexibility to choose between digital access only or a full bundle that includes both a printed copy and online access. With the digital access option, you\'ll gain entry to the full content of the report, a searchable catalogue of tools, and an exclusive feed with regular updates and industry events. If you prefer, the full bundle provides the best of both worlds, giving you an artistically-designed printed copy along with complete digital access.',
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
                                defaultMessage: 'The access is granted for one year/2025 edition of the report with regular updates of the data, news and premium content that is not available in hard copy of the Report.',
                            })}
                        />
                        <FaqRow
                            question={intl.formatMessage({
                                id: 'text_faq5_question',
                                defaultMessage: 'I want to get access to the online platform for our office. Is there any discount?',
                            })}
                            answer={intl.formatMessage({
                                id: 'text_faq5_answer',
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
