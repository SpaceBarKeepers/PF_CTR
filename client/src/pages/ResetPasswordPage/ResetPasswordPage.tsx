import React, { useEffect } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import LayoutPublicWrapper from '../../wrappers/LayoutPublicWrapper';
import './resetPasswordPage.scss';
import ButtonColored from '../../components/Button/ButtonColored';
import { resetPassword } from '../../api/user';

interface FormElements extends HTMLFormElement {
    username: HTMLInputElement;
}

const ResetPasswordPage = () => {
    const [error, setError] = React.useState<string>('');
    const [disabled, setDisabled] = React.useState<boolean>(false);
    const intl = useIntl();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget as FormElements;
        const username = form.username.value;

        setDisabled(true);
        try {
            await resetPassword(username);
            form.username.value = '';
            setError('Success!! Check your email for your new password.');
        } catch (error: any) {
            console.log(error, error.message);
            setError(intl.formatMessage({ id: error.message }));
        }
        setDisabled(false);
    };

    return (
        <LayoutPublicWrapper>
            <div className={'resetPasswordPage'}>
                <form className={'resetPasswordPage__form'} onSubmit={handleReset}>
                    <p>To reset your password enter e-mail address associated with the account.</p>
                    <div className={'resetPasswordPage__formUsername'}>
                        <label htmlFor={'username'}><FormattedMessage id={'label_email'}
                                                                      defaultMessage={'E-mail'} />:
                            <input type="text" id="username" name="username" />
                        </label>
                    </div>
                    <div className={'resetPasswordPage__formSubmit'}>
                        <ButtonColored childIsLink={false} disabled={disabled}>
                            Reset Password
                        </ButtonColored>
                    </div>
                    <div className={'resetPasswordPage__formError'}>
                        <p>{error}</p>
                    </div>
                </form>
            </div>
        </LayoutPublicWrapper>
    );
};

export default ResetPasswordPage;
