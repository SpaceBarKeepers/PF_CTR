import LayoutPublicWrapper from '../../wrappers/LayoutPublicWrapper';
import { FLAG_PRESALE } from '../../dev_flags';
import { FormattedMessage } from 'react-intl';
import ButtonColored from '../../components/Button/ButtonColored';
import "./landingPage.scss"

const LandingPage = () => {
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

            </div>
        </LayoutPublicWrapper>
    );
};

export default LandingPage;
