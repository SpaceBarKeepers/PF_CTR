import React, {useEffect} from 'react';
import {loginUserWithUsernameAndPassword} from "../../api/user";
import {useAtom} from "jotai";
import {tokenAtom} from "../../atomStore";
import {TokenEntity} from "../../models/entities";

type Props = {};

const LoginPage = ({}: Props) => {
    const [loginError, setLoginError] = React.useState<string>("")
    const [token, setToken] = useAtom(tokenAtom)

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

    useEffect(() => {
        if (token) {
            console.log("token", token)
        }
    }, [token]);

    return (
        <div>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor={"username"}>Username:</label>
                    <input type="text" id="username" name="username" />
                </div>
                <div>
                    <label htmlFor={"password"}>Password:</label>
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
