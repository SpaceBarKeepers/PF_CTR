import React, { useEffect } from 'react';
import { loginUserWithUsernameAndPassword, tokenRefresh } from '../../api/auth';
import { useAtom } from 'jotai';
import { tokenAtom } from '../../atomStore';
import { TokenEntity } from '../../models/entities';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useForcedLogout } from '../../lib/logout';
import { FormattedMessage, useIntl } from 'react-intl';
import LayoutPublicWrapper from '../../wrappers/LayoutPublicWrapper';
import "./loginPage.scss"
import ButtonColored from '../../components/Button/ButtonColored';

interface FormElements extends HTMLFormElement {
    username: HTMLInputElement;
    password: HTMLInputElement;
}

const LoginPage = () => {
    const [loginError, setLoginError] = React.useState<string>('');
    const [token, setToken] = useAtom(tokenAtom);
    const navigate = useNavigate();
    const forcedLogout = useForcedLogout();
    const intl = useIntl();

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        // try autologin from cookie
        tokenRefresh()
            .then((response: TokenEntity) => {
                setToken(response);
            })
            .catch((error: Error) => {
                if (error.message === 'error_invalid_token') forcedLogout();
                else console.error(error);
            });
    }, [forcedLogout, setToken]);

    const handleLogin = (e: React.FormEvent<FormElements>) => {
        e.preventDefault();

        const target = e.target as FormElements;

        loginUserWithUsernameAndPassword(target.username.value, target.password.value)
            .then((response: TokenEntity) => {
                setToken(response);
            })
            .catch((error: any) => {
                setLoginError(() => {
                    if (error.message === "error_invalid_credentials") return intl.formatMessage({ id: 'error_invalid_credentials', defaultMessage: 'Invalid username or password.' });
                    else return intl.formatMessage({ id: 'error_unknown', defaultMessage: 'Something went wrong.' });
                });
            });
    };

    // If token is in Atom AND is valid, navigate to /device-check
    useEffect(() => {
        if (token) {
            const expiration = jwtDecode(token.access_token).exp;
            if (expiration && Date.now() < expiration * 1000) navigate('/device-check');
        }
    }, [token, navigate]);

    return (
        <LayoutPublicWrapper>
            <div className={'loginPage'}>
                <form className={'loginPage__form'} onSubmit={handleLogin}>
                    <div className={'loginPage__formUsername'}>
                        <label htmlFor={'username'}><FormattedMessage id={'label_username'}
                                                                      defaultMessage={'Username'} />:
                            <input type="text" id="username" name="username" />
                        </label>
                    </div>
                    <div className={'loginPage__formPassword'}>
                        <label htmlFor={'password'}><FormattedMessage id={'label_password'}
                                                                      defaultMessage={'Password'} />:
                            <input type="password" id="password" name="password" />
                        </label>
                    <Link to={'/reset-password'} className={"loginPage__resetPassword"}><FormattedMessage id={'label_reset_password'} defaultMessage={"Reset password"}/></Link>
                    </div>
                    <div className={'loginPage__formSubmit'}>
                        <ButtonColored childIsLink={false}>
                            Login
                        </ButtonColored>
                    </div>
                    <div className={'loginPage__formError'}>
                        <p>{loginError}</p>
                    </div>
                </form>
            </div>
        </LayoutPublicWrapper>
    );
};

export default LoginPage;
