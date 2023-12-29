import {createBrowserRouter, RouterProvider, useNavigate} from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import {useAtomValue} from "jotai/index";
import {languageAtom, tokenAtom} from "./atomStore";
import {IntlProvider} from "react-intl";
import {ReactElement, useEffect, useState} from "react";
import translate from "./translate.json";
import DeviceCheckPage from "./pages/DeviceCheckPage/DeviceCheckPage";
import HomepagePage from "./pages/HomepagePage/HomepagePage";
import AccountPage from "./pages/AccountPage/AccountPage";

function App() {
    const [messages, setMessages] = useState({})
    const language = useAtomValue(languageAtom)

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
    ]);

    return (
        <IntlProvider locale={language ? language : "en"} messages={messages}>
            <RouterProvider router={router}/>
        </IntlProvider>
    )
}

const AuthRequired = ({children}: { children: ReactElement }) => {
    const token = useAtomValue(tokenAtom)
    const navigate = useNavigate()

    useEffect(() => {
        if (!token) navigate("/login")
    }, [token])

    return children
}

export default App
