import LayoutPrivateWrapper from '../../wrappers/LayoutPrivateWrapper';
import { FormattedMessage } from 'react-intl';
import ButtonColored from '../../components/Button/ButtonColored';
import React, { useEffect } from 'react';
import './accountPage.scss';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { loginUserWithUsernameAndPassword, tokenRefresh } from '../../api/auth';
import { changePassword } from '../../api/user';

interface FormElements extends HTMLFormElement {
    password: HTMLInputElement;
    newPassword: HTMLInputElement;
    confirmPassword: HTMLInputElement;
}

interface CustomJwtPayload extends JwtPayload {
    username: string;
}

const AccountPage = () => {
    const [username, setUsername] = React.useState<string>('');
    const [error, setError] = React.useState<string>('');


    useEffect(() => {
        tokenRefresh()
            .then((response) => {
                    if (response) {
                        const username = jwtDecode<CustomJwtPayload>(response.access_token).username;
                        setUsername(username);
                    }
                },
            );
    }, []);

    const handlePasswordChange = (e: React.FormEvent<FormElements>) => {
        e.preventDefault();

        const target = e.target as FormElements;

        if (target.newPassword.value !== target.confirmPassword.value) {
            setError('New passwords do not match.');
            return;
        }



        loginUserWithUsernameAndPassword(username, target.password.value)
            .then((token) => {
                if (!token) {
                    throw new Error('error_invalid_refresh');
                }
                return token.access_token;
            })
            .then((token) => {
                console.log(token);
                return changePassword(token, username, target.newPassword.value);
            })
            .then(() => {
                setError('Password changed successfully.');
                target.password.value = '';
                target.newPassword.value = '';
                target.confirmPassword.value = '';
            })
            .catch((error: any) => {
                setError(error.message);
            });
    };

    return (
        <LayoutPrivateWrapper>
            <div className={'accountPage'}>
                <form className={'accountPage__form'} onSubmit={handlePasswordChange}>
                    <h3>Change your password:</h3>
                    <div className={'accountPage__formUsername'}>
                        <label htmlFor={'username'}>
                            <FormattedMessage id={'label_username'} defaultMessage={'Username'} />
                            {': '}
                            {username}
                        </label>
                    </div>
                    <div className={'accountPage__formPassword'}>
                        <label htmlFor={'password'}><FormattedMessage id={'label_password'}
                                                                      defaultMessage={'Password'} />:
                            <input type="password" id="password" name="password" />
                        </label>
                    </div>
                    <div className={'accountPage__formPassword'}>
                        <label htmlFor={'newPassword'}><FormattedMessage id={'label_new_password'}
                                                                      defaultMessage={'New password'} />:
                            <input type="password" id="newPassword" name="newPassword" />
                        </label>
                    </div>
                    <div className={'accountPage__formPassword'}>
                        <label htmlFor={'confirmPassword'}><FormattedMessage id={'label_confirm_password'}
                                                                      defaultMessage={'Confirm new password'} />:
                            <input type="password" id="confirmPassword" name="confirmPassword" />
                        </label>
                    </div>
                    <div className={'accountPage__formSubmit'}>
                        <ButtonColored childIsLink={false}>
                            Change
                        </ButtonColored>
                    </div>
                    <div className={'accountPage__formError'}>
                        <p>{error}</p>
                    </div>
                </form>
            </div>
        </LayoutPrivateWrapper>
    );
};

export default AccountPage;
