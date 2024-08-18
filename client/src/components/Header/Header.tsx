import { FormattedMessage } from 'react-intl';
import { Link, useNavigate } from 'react-router-dom';
import { useForcedLogout } from '../../lib/logout';
import ButtonColored from '../Button/ButtonColored';
import './header.scss';

const Header = () => {
    const navigate = useNavigate();
    const logout = useForcedLogout();

    const handleClickAccount = () => {
        navigate('/account');
    };

    const handleLogout = () => {
        logout();
    };

    return (
        <div className={'header'}>
            <nav>
                <Link to={'/homepage'}>
                    <img src={'/images/PFlogo.png'} alt={'logo Participation Factory'} />
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
            </nav>
            <div>
                <ButtonColored onClick={handleClickAccount} type={'secondary'}>
                    <Link to={'/account'}>
                        <FormattedMessage
                            id={'label_your_account'}
                            defaultMessage={'Your account'}
                        />
                    </Link>
                </ButtonColored>
                {/*<ButtonColored childIsLink={false} onClick={handleLogout}>*/}
                {/*    Logout - vymazat*/}
                {/*</ButtonColored>*/}
                {/*<ButtonLanguage />*/}
            </div>
        </div>
    );
};

export default Header;
