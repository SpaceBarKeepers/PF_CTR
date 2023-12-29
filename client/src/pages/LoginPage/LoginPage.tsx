import React, {useEffect} from 'react';
import {loginUserWithUsernameAndPassword, tokenRefresh} from "../../api/user";
import {useAtom} from "jotai";
import {tokenAtom} from "../../atomStore";
import {TokenEntity} from "../../models/entities";
import {useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import {useForcedLogout} from "../../lib/forceLogout";
import {FormattedMessage} from "react-intl";

type Props = {};

const LoginPage = ({}: Props) => {
    const [loginError, setLoginError] = React.useState<string>("")
    const [token, setToken] = useAtom(tokenAtom)
    const navigate = useNavigate()
    const forcedLogout = useForcedLogout()

    useEffect(() => {
        // try autologin from cookie
        tokenRefresh()
            .then((response: TokenEntity) => {
                setToken(response)
            })
            .catch((error: string) => {
                if (error.message === "error_invalid_device_hash" || error.message === "error_invalid_token") forcedLogout()
                else console.error(error)
            })
    }, []);

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!e.target.username.value || !e.target.password.value) setLoginError("error_login_required")
        loginUserWithUsernameAndPassword(e.target.username.value, e.target.password.value)
            .then((response: TokenEntity) => {
                setToken(response)
            })
            .catch((error: string) => {
                setLoginError(error.message)
            })
    }

    // If token is in Atom AND is valid, navigate to /device-check
    useEffect(() => {
        if (token) {
            const expiration = jwtDecode(token.access_token).exp
            if (expiration && Date.now() < expiration * 1000) navigate("/device-check")
        }
    }, [token]);

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
