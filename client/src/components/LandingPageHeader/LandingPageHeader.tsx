import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import ButtonColored from '../Button/ButtonColored';
import { FLAG_PRESALE } from '../../dev_flags';
import ButtonLanguage from '../Button/ButtonLanguage';
import "./landingPageHeader.scss"
import { useState } from 'react';

const LandingPageHeader = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleClickHambuger = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    }

    const handleClickLink = () => {
        setMobileMenuOpen(false);
    }

    return (
        <div className={'landingHeader'}>
            <div className={'landingHeader__hamburger'} onClick={handleClickHambuger}>
                {mobileMenuOpen
                    ? <svg width="40" height="40" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg">
                        <rect x="4" y="5" width="2" height="20" transform="rotate(-45 5 5)" />
                        <rect x="18" y="5" width="2" height="20" transform="rotate(45 19 5)" />
                    </svg>
                    : <svg width="40" height="40" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg">
                        <rect x="3" y="6" width="18" height="2" />
                        <rect x="3" y="11" width="18" height="2" />
                        <rect x="3" y="16" width="18" height="2" />
                    </svg>}
            </div>

            <img src={'/images/PFlogo.png'} alt={'logo Participation Factory'} />
            <div className={'landingHeader__navigationContainer'}>
                <div className={'landingHeader__loginAndLanguage'}>
                    <div className={'landingHeader__login'}>
                    <ButtonColored>
                            <a href={'#pricingSection'}>
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
                <nav
                    style={{ display: mobileMenuOpen ? 'flex' : undefined }}
                >
                    <a href={'#aboutSection'} onClick={handleClickLink}>
                        <FormattedMessage id={'label_about_report'} defaultMessage={'About Report'} />
                    </a>
                    <a href={'#whatsInsideSection'} onClick={handleClickLink}>
                        <FormattedMessage id={'label_whats_inside'} defaultMessage={'What\'s inside'} />
                    </a>
                    <a href={'#whoForSection'} onClick={handleClickLink}>
                        <FormattedMessage id={'label_who_for'} defaultMessage={'Who is it for'} />
                    </a>
                    <a href={'#whatYouGetSection'} onClick={handleClickLink}>
                        <FormattedMessage id={'label_what_you_get'} defaultMessage={'What you get'} />
                    </a>
                    <a href={'#pricingSection'} onClick={handleClickLink}>
                        <FormattedMessage id={'label_pricing'} defaultMessage={'Pricing'} />
                    </a>
                    {!FLAG_PRESALE && <Link to={'/contact'} onClick={handleClickLink}>
                      <FormattedMessage id={'label_contact'} defaultMessage={'Contact'} />
                    </Link>}
                </nav>
            </div>
        </div>
    );
};

export default LandingPageHeader;
