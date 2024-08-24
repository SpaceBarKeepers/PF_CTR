import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import ButtonColored from '../Button/ButtonColored';
import ButtonLanguage from '../Button/ButtonLanguage';
import './adminHeader.scss';
import { useAdminLogout } from '../../lib/logoutAdmin';

const AdminHeader = () => {
    const logout = useAdminLogout()

    const handleLogout = () => {
        logout()
    }
    return (
        <div className={"adminHeader"}>
            <nav className={'adminHeader__navigation'}>
            <Link to={'/admin/dashboard'}>
                <FormattedMessage id={'label_dashboard'} defaultMessage={'Dashboard'} />
            </Link>
            <Link to={'/admin/users'}>
                <FormattedMessage id={'label_users'} defaultMessage={'Users'} />
            </Link>
            <Link to={'/admin/knowledge'}>
                <FormattedMessage id={'label_knowledge_base'} defaultMessage={'Knowledge base'} />
            </Link>
            <Link to={'/admin/news'}>
                <FormattedMessage id={'label_news'} defaultMessage={'NewsEntity'} />
            </Link>
            <Link to={'/admin/pages'}>
                <FormattedMessage id={'label_pages'} defaultMessage={'Pages'} />
            </Link>
            <Link to={'/admin/events'}>
                <FormattedMessage id={'label_events'} defaultMessage={'Events'} />
            </Link>
            <Link to={'/admin/tools'}>
                <FormattedMessage id={'label_tools'} defaultMessage={'Tools'} />
            </Link>
                <Link to={'/admin/feed'}>
                    <FormattedMessage id={'label_feed'} defaultMessage={'Feed'} />
                </Link>
            </nav>
            <div className={"adminHeader__buttons"}>
                <ButtonColored childIsLink={false} onClick={handleLogout}>
                    <FormattedMessage id={'label_logout'} defaultMessage={'Logout'} />
                </ButtonColored>
                <ButtonLanguage />
            </div>
        </div>
    );
};

export default AdminHeader;
