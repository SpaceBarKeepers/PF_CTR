import {createBrowserRouter, RouterProvider} from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import {useAtomValue} from "jotai/index";
import {languageAtom} from "./atomStore";
import {IntlProvider} from "react-intl";
import {useEffect, useState} from "react";
import translate from "./translate.json";

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
            element: <HomePage/>,
        },
        {
            path: '/login',
            element: <LoginPage/>,
        },
    ]);

    return (
        <IntlProvider locale={language ? language : "en"} messages={messages}>
            <RouterProvider router={router}/>
        </IntlProvider>
    )
}

export default App
