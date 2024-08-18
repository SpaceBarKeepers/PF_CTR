import React, {useEffect} from 'react';
import {loginUserWithUsernameAndPassword, tokenRefresh} from "../../api/auth";
import {useAtom} from "jotai";
import {    tokenAtom} from "../../atomStore";
import {TokenEntity} from "../../models/entities";
import {useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import {useForcedLogout} from "../../lib/logout";
import {FormattedMessage} from "react-intl";

interface FormElements extends HTMLFormElement {
    username: HTMLInputElement;
    password: HTMLInputElement;
}

const LoginPage = () => {
    const [, setLoginError] = React.useState<string>("")
    const [token, setToken] = useAtom(tokenAtom)
    const navigate = useNavigate()
    const forcedLogout = useForcedLogout()

    useEffect(() => {
        // try autologin from cookie
        tokenRefresh()
            .then((response: TokenEntity) => {
                setToken(response)
            })
            .catch((error: Error) => {
                if (error.message === "error_invalid_token") forcedLogout()
                else console.error(error)
            })
    }, [forcedLogout, setToken]);

    const handleLogin = (e: React.FormEvent<FormElements>) => {
        e.preventDefault();

        const target = e.target as FormElements;

        if (!target.username.value || !target.password.value) setLoginError("error_login_required")
        loginUserWithUsernameAndPassword(target.username.value, target.password.value)
            .then((response: TokenEntity) => {
                setToken(response)
            })
            .catch((error: Error) => {
                setLoginError(error.message)
            })
    }

    // If token is in Atom AND is valid, navigate to /device-check
    useEffect(() => {
        if (token) {
            const expiration = jwtDecode(token.access_token).exp
            if (expiration && Date.now() < expiration * 1000) navigate("/device-check")
        }
    }, [token, navigate]);

    return (
        <div>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor={"username"}><FormattedMessage id={"label_username"} defaultMessage={"Username"} />:</label>
                    <input type="text" id="username" name="username" />
                </div>
                <div>
                    <label htmlFor={"password"}><FormattedMessage id={"label_password"} defaultMessage={"Password"} />:</label>
                    <input type="password" id="password" name="password" />
                </div>
                <div>
                    <input type="submit" value="Login" />
                </div>
            </form>
            LoginPage
        </div>
    );
};

export default LoginPage;
