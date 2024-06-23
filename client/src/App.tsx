import {createBrowserRouter, RouterProvider, useLocation, useNavigate} from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import {useAtomValue} from "jotai/index";
import {languageAtom, redirectUrlAtom, tokenAdminAtom, tokenAtom} from "./atomStore";
import {IntlProvider} from "react-intl";
import {ReactElement, useEffect, useState} from "react";
import translate from "./translate.json";
import DeviceCheckPage from "./pages/DeviceCheckPage/DeviceCheckPage";
import HomepagePage from "./pages/HomepagePage/HomepagePage";
import AccountPage from "./pages/AccountPage/AccountPage";
import {useSetAtom} from "jotai";
import AdminLoginPage from "./pagesAdmin/AdminLoginPage/AdminLoginPage";
import AdminDashboardPage from "./pagesAdmin/AdminDashboardPage/AdminDashboardPage";
import AdminUsersPage from "./pagesAdmin/AdminUsersPage/AdminUsersPage";
import AdminKnowledgePage from "./pagesAdmin/AdminKnowledgePage/AdminKnowledgePage";
import AdminNewsPage from './pagesAdmin/AdminNewsPage/AdminNewsPage';
import AdminPagesPage from './pagesAdmin/AdminPagesPage/AdminPagesPage';
import AdminEventsPage from './pagesAdmin/AdminEventsPage/AdminEventsPage';
import AdminToolsPage from './pagesAdmin/AdminToolsPage/AdminToolsPage';

function App() {
    const [messages, setMessages] = useState({})
    const language = useAtomValue(languageAtom)
    const adminToken = useAtomValue(tokenAdminAtom)

    // Load translations for currently selected language
    useEffect(() => {
        if (!language) return
        setMessages({
            ...(JSON.parse(JSON.stringify(translate))[language] && JSON.parse(JSON.stringify(translate))[language]),
        })
    }, [language])

    const router = createBrowserRouter([
        {
            path: '/',
            element: <LandingPage/>,
        },
        {
            path: '/login',
            element: <LoginPage/>,
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
            path: '/account',
            element: <AuthRequired><AccountPage /></AuthRequired>,
        },
        {
            path: '/admin',
            element: <AdminLoginPage/>,
        },
        {
            path: '/admin/dashboard',
            element: adminToken ? <AdminDashboardPage /> : <AdminLoginPage/>,
        },
        {
            path: '/admin/users',
            element: adminToken ? <AdminUsersPage /> : <AdminLoginPage/>,
        },
        {
            path: '/admin/knowledge',
            element: adminToken ? <AdminKnowledgePage /> : <AdminLoginPage/>,
        },
        {
            path: '/admin/news',
            element: adminToken ? <AdminNewsPage /> : <AdminLoginPage/>,
        },
        {
            path: '/admin/pages',
            element: adminToken ? <AdminPagesPage /> : <AdminLoginPage/>,
        },
        {
            path: '/admin/events',
            element: adminToken ? <AdminEventsPage /> : <AdminLoginPage/>,
        },
        {
            path: '/admin/tools',
            element: adminToken ? <AdminToolsPage /> : <AdminLoginPage/>,
        },
    ]);

    return (
        <IntlProvider locale={language ? language : "en"} messages={messages}>
            <RouterProvider router={router}/>
        </IntlProvider>
    )
}

const AuthRequired = ({children}: { children: ReactElement }) => {
    const setRedirectAtom = useSetAtom(redirectUrlAtom)
    const token = useAtomValue(tokenAtom)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if (location.pathname === "/login") return
        if (location.pathname === "/device-check") return
        setRedirectAtom(location.pathname)
    }, [location.pathname, setRedirectAtom]);

    useEffect(() => {
        if (!token) navigate("/login")
    }, [token, navigate])

    return children
}

export default App
