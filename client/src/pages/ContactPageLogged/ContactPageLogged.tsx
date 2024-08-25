import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import OrderInput from '../../components/OrderInput/OrderInput';
import './contactPage.scss';
import ButtonColored from '../../components/Button/ButtonColored';
import { sendContactEmail } from '../../api/email';
import LayoutPrivateWrapper from '../../wrappers/LayoutPrivateWrapper';

const ContactPageLogged = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [organization, setOrganization] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [validation, setValidation] = useState('');
    const intl = useIntl();

    const handleSend = () => {
        if (!name || !email || !message) {
            setValidation(intl.formatMessage({
                id: 'error_order_fill_all_required_fields',
                defaultMessage: 'Please fill all required fields.',
            }));
            return;
        }

        if (email && !email.includes('@')) {
            setValidation(intl.formatMessage({ id: 'error_invalid_email', defaultMessage: 'Invalid email address.' }));
            return;
        }
        setValidation('');
        sendContactEmail({ name: name, email: email, organization: organization, phone: phone, message: message })
            .then(() => {
                setValidation(intl.formatMessage({
                    id: 'success_message_sent',
                    defaultMessage: 'Message sent successfully',
                }));
            })
            .catch((error) => {
                setValidation(error.message);
            });
    };

    return (
        <LayoutPrivateWrapper>
            <div className={'contactPage'}>
                <h1>Contact Page</h1>
                <div className={'contactPage__form'}>
                    <OrderInput
                        label={intl.formatMessage({ id: 'label_name', defaultMessage: 'Name' })}
                        required={true}
                        state={name}
                        setState={setName}
                    />
                    <OrderInput
                        label={intl.formatMessage({ id: 'label_email', defaultMessage: 'E-mail' })}
                        required={true}
                        state={email}
                        setState={setEmail}
                    />
                    <OrderInput
                        label={intl.formatMessage({
                            id: 'label_organization',
                            defaultMessage: 'Organization/Institution',
                        })}
                        state={organization}
                        setState={setOrganization}
                    />
                    <OrderInput
                        label={intl.formatMessage({ id: 'label_phone', defaultMessage: 'Phone' })}
                        state={phone}
                        setState={setPhone}
                    />
                    <OrderInput
                        label={intl.formatMessage({ id: 'label_message', defaultMessage: 'Message' })}
                        required={true}
                        state={message}
                        setState={setMessage}
                        multiline={true}
                    />
                    <ButtonColored
                        onClick={handleSend}
                        childIsLink={false}
                        style={{ marginTop: '10px', alignSelf: 'flex-start' }}
                    >
                        <FormattedMessage id={'label_send'} defaultMessage={'Send'} />
                    </ButtonColored>
                    {validation && <p className={'contactPage__validation'}>{validation}</p>}
                </div>
            </div>
        </LayoutPrivateWrapper>
    );
};

export default ContactPageLogged;