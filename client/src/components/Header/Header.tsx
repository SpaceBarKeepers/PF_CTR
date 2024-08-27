import { FormattedMessage } from 'react-intl';
import { Link, useNavigate } from 'react-router-dom';
import ButtonColored from '../Button/ButtonColored';
import './header.scss';
import { useState } from 'react';

const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    // const logout = useForcedLogout();

    const handleClickAccount = () => {
        navigate('/account');
    };
    const handleClickHambuger = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };


    // const handleLogout = () => {
    //     logout();
    // };

    return (
        <div className={'header'}>
            <div className={'header__hamburger'} onClick={handleClickHambuger}>
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

            <nav style={{ display: mobileMenuOpen ? 'flex' : undefined }}>

                <Link to={'/homepage'}>
                    {mobileMenuOpen
                        ? <FormattedMessage
                            id={'label_home'}
                            defaultMessage={'Home'}
                        />
                        : <img src={'/images/PFlogo.png'} alt={'logo Participation Factory'} />}
                </Link>
                <Link to={'/catalogue'}>
                    <FormattedMessage
                        id={'label_catalogue'}
                        defaultMessage={'Catalogue'}
                    />
                </Link>
                <Link to={'/knowledge-base'}>
                    <FormattedMessage
                        id={'label_knowledge_base'}
                        defaultMessage={'Knowledge Base'}
                    />
                </Link>
                <Link to={'/news'}>
                    <FormattedMessage
                        id={'label_news'}
                        defaultMessage={'NewsEntity'}
                    />
                </Link>
                <Link to={'/trends'}>
                    <FormattedMessage
                        id={'label_trends'}
                        defaultMessage={'Trends'}
                    />
                </Link>
                <Link to={'/contactLogged'}>
                    <FormattedMessage
                        id={'label_contact'}
                        defaultMessage={'Contact'}
                    />
                </Link>
                <ButtonColored className={"account_button"} onClick={handleClickAccount} buttonType={'secondary'}>
                    <Link to={'/account'}>
                        <FormattedMessage
                            id={'label_your_account'}
                            defaultMessage={'Your account'}
                        />
                    </Link>
                </ButtonColored>
            </nav>
            <div>
                {/*<ButtonColored childIsLink={false} onClick={handleLogout}>*/}
                {/*    Logout - vymazat*/}
                {/*</ButtonColored>*/}
                {/*<ButtonLanguage />*/}
            </div>
        </div>
    );
};

export default Header;
