import { createBrowserRouter, RouterProvider, useLocation, useNavigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import LoginPage from './pages/LoginPage/LoginPage';
import { useAtomValue } from 'jotai/index';
import { languageAtom, redirectUrlAtom, tokenAdminAtom, tokenAtom } from './atomStore';
import { IntlProvider } from 'react-intl';
import { ReactElement, useEffect, useState } from 'react';
import translate from './translate.json';
import DeviceCheckPage from './pages/DeviceCheckPage/DeviceCheckPage';
import HomepagePage from './pages/HomepagePage/HomepagePage';
import AccountPage from './pages/AccountPage/AccountPage';
import { useSetAtom } from 'jotai';
import AdminLoginPage from './pagesAdmin/AdminLoginPage/AdminLoginPage';
import AdminDashboardPage from './pagesAdmin/AdminDashboardPage/AdminDashboardPage';
import AdminUsersPage from './pagesAdmin/AdminUsersPage/AdminUsersPage';
import AdminKnowledgePage from './pagesAdmin/AdminKnowledgePage/AdminKnowledgePage';
import AdminNewsPage from './pagesAdmin/AdminNewsPage/AdminNewsPage';
import AdminPagesPage from './pagesAdmin/AdminPagesPage/AdminPagesPage';
import AdminEventsPage from './pagesAdmin/AdminEventsPage/AdminEventsPage';
import AdminToolsPage from './pagesAdmin/AdminToolsPage/AdminToolsPage';
import CataloguePage from './pages/CataloguePage/CataloguePage';
import KnowledgeBasePage from './pages/KnowledgeBasePage/KnowledgeBasePage';
import NewsPage from './pages/NewsPage/NewsPage';
import EditablePage from './pages/EditablePage/EditablePage';
import ContactPage from './pages/ContactPage/ContactPage';
import AdminKnowledgeEditPage from './pagesAdmin/AdminKnowledgeEditPage/AdminKnowledgeEditPage';
import AdminNewsEditPage from './pagesAdmin/AdminNewsEditPage/AdminNewsEditPage';
import AdminPagesEditPage from './pagesAdmin/AdminPagesEditPage/AdminPagesEditPage';
import AdminEventsEditPage from './pagesAdmin/AdminEventsEditPage/AdminEventsEditPage';
import AdminToolsEditPage from './pagesAdmin/AdminToolsEditPage/AdminToolsEditPage';
import OrderPage from './pages/OrderPage/OrderPage';
import ContactPageLogged from './pages/ContactPageLogged/ContactPageLogged';
import ArticlePage from './pages/ArticlePage/ArticlePage';
import { ARTICLE_TYPE_ENUM } from './models/enums';
import ToolDetail from './pages/ToolDetail/ToolDetail';
import AdminFeedPage from './pagesAdmin/AdminFeedPage/AdminFeedPage';
import AdminFeedEditPage from './pagesAdmin/AdminFeedEditPage/AdminFeedEditPage';
import ResetPasswordPage from './pages/ResetPasswordPage/ResetPasswordPage';

function App() {
    const [messages, setMessages] = useState({});
    const language = useAtomValue(languageAtom);
    // const adminToken = useAtomValue(tokenAdminAtom);

    // Load translations for currently selected language
    useEffect(() => {
        if (!language) return;
        setMessages({
            ...(JSON.parse(JSON.stringify(translate))[language] && JSON.parse(JSON.stringify(translate))[language]),
        });
    }, [language]);

    const router = createBrowserRouter([
        {
            path: '/',
            element: <LandingPage />,
        },
        {
            path: 'reset-password',
            element: <ResetPasswordPage />,
        },
        {
            path: '/order/:option',
            element: <OrderPage />,
        },
        {
            path: '/login',
            element: <LoginPage />,
        },
        {
            path: '/device-check',
            element: <AuthRequired><DeviceCheckPage /></AuthRequired>,
        },
        {
            path: '/homepage',
            element: <AuthRequired><HomepagePage /></AuthRequired>,
        },
        {
            path: '/catalogue',
            element: <AuthRequired><CataloguePage /></AuthRequired>,
        },
        {
            path: '/tool/:id',
            element: <AuthRequired><ToolDetail /></AuthRequired>,
        },
        {
            path: '/knowledge-base/:id',
            element: <AuthRequired><ArticlePage type={ARTICLE_TYPE_ENUM.KNOWLEDGE_BASE} /></AuthRequired>,
        },
        {
            path: '/knowledge-base',
            element: <AuthRequired><KnowledgeBasePage /></AuthRequired>,
        },
        {
            path: '/news/:id',
            element: <AuthRequired><ArticlePage type={ARTICLE_TYPE_ENUM.NEWS} /></AuthRequired>,
        },
        {
            path: '/news',
            element: <AuthRequired><NewsPage /></AuthRequired>,
        },
        {
            path: '/trends',
            element: <AuthRequired><EditablePage /></AuthRequired>,
        },
        {
            path: '/contact',
            element: <ContactPage />,
        },
        {
            path: '/contactLogged',
            element: <AuthRequired><ContactPageLogged /></AuthRequired>,
        },
        {
            path: '/account',
            element: <AuthRequired><AccountPage /></AuthRequired>,
        },
        {
            path: '/admin',
            element: <AdminLoginPage />,
        },
        {
            path: '/admin/dashboard',
            element: <AdminAuthRequired><AdminDashboardPage /></AdminAuthRequired>,
        },
        {
            path: '/admin/users',
            element: <AdminAuthRequired><AdminUsersPage /></AdminAuthRequired>,
        },
        {
            path: '/admin/knowledge/new',
            element: <AdminAuthRequired><AdminKnowledgeEditPage /></AdminAuthRequired>,
        },
        {
            path: '/admin/knowledge/:id',
            element: <AdminAuthRequired><AdminKnowledgeEditPage /></AdminAuthRequired>,
        },
        {
            path: '/admin/knowledge',
            element: <AdminAuthRequired><AdminKnowledgePage /></AdminAuthRequired>,
        },
        {
            path: '/admin/news/new',
            element: <AdminAuthRequired><AdminNewsEditPage /></AdminAuthRequired>,
        },
        {
            path: '/admin/news/:id',
            element: <AdminAuthRequired><AdminNewsEditPage /></AdminAuthRequired>,
        },
        {
            path: '/admin/news',
            element: <AdminAuthRequired><AdminNewsPage /></AdminAuthRequired>,
        },
        {
            path: '/admin/pages/trends',
            element: <AdminAuthRequired><AdminPagesEditPage page={'trends'} /></AdminAuthRequired>,
        },
        {
            path: '/admin/pages',
            element: <AdminAuthRequired><AdminPagesPage /></AdminAuthRequired>,
        },
        {
            path: '/admin/events/new',
            element: <AdminAuthRequired><AdminEventsEditPage /></AdminAuthRequired>,
        },
        {
            path: '/admin/events/:id',
            element: <AdminAuthRequired><AdminEventsEditPage /></AdminAuthRequired>,
        },
        {
            path: '/admin/events',
            element: <AdminAuthRequired><AdminEventsPage /></AdminAuthRequired>,
        },
        {
            path: '/admin/feed/new',
            element: <AdminAuthRequired><AdminFeedEditPage /></AdminAuthRequired>,
        },
        {
            path: '/admin/feed/:id',
            element: <AdminAuthRequired><AdminFeedEditPage /></AdminAuthRequired>,
        },
        {
            path: '/admin/feed',
            element: <AdminAuthRequired><AdminFeedPage /></AdminAuthRequired>,
        },
        {
            path: '/admin/tools/new',
            element: <AdminAuthRequired><AdminToolsEditPage /></AdminAuthRequired>,
        },
        {
            path: '/admin/tools/:id',
            element: <AdminAuthRequired><AdminToolsEditPage /></AdminAuthRequired>,
        },
        {
            path: '/admin/tools',
            element: <AdminAuthRequired><AdminToolsPage /></AdminAuthRequired>,
        },
    ]);

    return (
        <IntlProvider locale={language ? language : 'en'} messages={messages}>
            <RouterProvider router={router} />
        </IntlProvider>
    );
}

const AuthRequired = ({ children }: { children: ReactElement }) => {
    const setRedirectAtom = useSetAtom(redirectUrlAtom);
    const token = useAtomValue(tokenAtom);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/login') return;
        if (location.pathname === '/device-check') return;
        setRedirectAtom(location.pathname);
    }, [location.pathname, setRedirectAtom]);

    useEffect(() => {
        if (!token) navigate('/login');
        // this cause a problem with navigation path
        // else {
        // const expiration = jwtDecode(token.access_token).exp
        // if (expiration && Date.now() > expiration * 1000) navigate("/login", {replace: true})
        // }
    }, [token, navigate]);

    return children;
};

const AdminAuthRequired = ({ children }: { children: ReactElement }) => {
    const token = useAtomValue(tokenAdminAtom);
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) navigate('/admin');
    }, [token, navigate]);

    return children;
};

export default App;
