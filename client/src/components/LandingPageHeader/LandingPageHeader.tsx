import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import ButtonColored from '../Button/ButtonColored';
import { FLAG_PRESALE } from '../../dev_flags';
import ButtonLanguage from '../Button/ButtonLanguage';
import "./landingPageHeader.scss"

type Props = {};

const LandingPageHeader = ({}: Props) => {
    return (
        <div className={'landingHeader'}>
            <img src={'/images/PFlogo.png'} alt={'logo Participation Factory'} />
            <div className={'landingHeader__navigationContainer'}>
                <div className={'landingHeader__loginAndLanguage'}>
                    <div className={"landingHeader__login"}>
                    <ButtonColored>
                        <a href={'#purchaseSection'}>
                            <FormattedMessage id={'label_buy'} defaultMessage={'Buy Report'} />
                        </a>
                    </ButtonColored>
                    {!FLAG_PRESALE && <ButtonColored type={'secondary'}>
                        <Link to={'/login'}>
                            <FormattedMessage id={'label_login'} defaultMessage={'Login'} />
                        </Link>
                    </ButtonColored>
                    }
                    </div>
                    {!FLAG_PRESALE && <ButtonLanguage />}
                </div>
                <nav>
                    <a href={'#aboutSection'}>
                        <FormattedMessage id={'label_about_report'} defaultMessage={'About Report'} />
                    </a>
                    <a href={'#aboutSection'}>
                        <FormattedMessage id={'label_whats_inside'} defaultMessage={'What\'s inside'} />
                    </a>
                    <a href={'#whoForSection'}>
                        <FormattedMessage id={'label_who_for'} defaultMessage={'Who is it for'} />
                    </a>
                    <a href={'#whatYouGetSection'}>
                        <FormattedMessage id={'label_what_you_get'} defaultMessage={'What you get'} />
                    </a>
                    <a href={'#pricingSection'}>
                        <FormattedMessage id={'label_pricing'} defaultMessage={'Pricing'} />
                    </a>
                    <Link to={'/contact'}>
                            <FormattedMessage id={'label_contact'} defaultMessage={'Contact'} />
                    </Link>
                </nav>
            </div>
        </div>
    );
};

export default LandingPageHeader;
