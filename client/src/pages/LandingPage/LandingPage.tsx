import LayoutPublicWrapper from '../../wrappers/LayoutPublicWrapper';
import { FLAG_PRESALE } from '../../dev_flags';
import { FormattedMessage } from 'react-intl';
import ButtonColored from '../../components/Button/ButtonColored';
import './landingPage.scss';
import { languageAtom } from '../../atomStore';
import { useAtomValue } from 'jotai/index';
import { LANGUAGE_ENUM } from '../../models/enums';

const LandingPage = () => {
    const language = useAtomValue(languageAtom)

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
                        src={"/images/landing_about.png"}
                        alt={language === LANGUAGE_ENUM.CS ? 'obrázek produktu' : 'report image'}
                    />
                </section>
            </div>
        </LayoutPublicWrapper>
    );
};

export default LandingPage;
