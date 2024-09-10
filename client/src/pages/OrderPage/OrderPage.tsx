import LayoutPublicWrapper from '../../wrappers/LayoutPublicWrapper';
import { FormattedMessage, useIntl } from 'react-intl';
import OrderInput from '../../components/OrderInput/OrderInput';
import { ChangeEvent, useEffect, useState } from 'react';
import './orderPage.scss';
import OrderItem from '../../components/OrderItem/OrderItem';
import { loadStripe } from '@stripe/stripe-js';
import { apiRoot } from '../../api/apiRoot';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../../components/CheckoutForm/CheckoutForm';
import { CTR_OPTION_ENUM, CTR_SHIPPING_ENUM } from '../../models/enums';
import { shippingCountrySelectArray, shippingCountryToRegion } from '../../models/countries';
import { useParams } from 'react-router-dom';
import { isEmailAddress } from '../../lib/isEmailAddress';
import { checkUserExists } from '../../api/user';

// const stripePromise = loadStripe('pk_test_51PcnIgRuy3DzAnAUck92B3nZ4PeL82buh0C5HxWIBsnVXWGX2WyOg3UxFB5PLYiAB0zQVXU8uYXXuhtwo4fEO8Ae00h7TE7Ecz');
const stripePromise = loadStripe('pk_live_51PcnIgRuy3DzAnAUpscuvuJu476cDaiQXwjamGUWWrUZNwrDqkES8Ax1FDKEHuzqcqqVbGP05tyhsBYSxa5898Ya00BPT2f3tD');

interface OrderDto {
    option: CTR_OPTION_ENUM;
    shipping: CTR_SHIPPING_ENUM;
    metadata: Record<string, string>;
}

const OrderPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [organization, setOrganization] = useState('');
    const [address, setAddress] = useState('');
    const [shippingCode, setShippingCode] = useState('cz');
    const [shippingPrice, setShippingPrice] = useState(0);
    const [optionPrice, setOptionPrice] = useState(0);
    const [clientSecret, setClientSecret] = useState('');
    const intl = useIntl();
    const [validationError, setValidationError] = useState(intl.formatMessage({
        id: 'error_order_fill_all_required',
        defaultMessage: 'Please fill all required fields.',
    }));
    const { option } = useParams();

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [option])

    useEffect(() => {
        if (!name || !email || !address || !shippingCode) {
            setValidationError(intl.formatMessage({
                id: 'error_order_fill_all_required',
                defaultMessage: 'Please fill all required fields.',
            }));
            return;
        }

        if (!isEmailAddress(email)) {
            setValidationError(intl.formatMessage({
                id: 'error_order_invalid_email',
                defaultMessage: 'Invalid e-mail address.',
            }));
            return;
        }

        checkUserExists(email).then((userExists) => {
            userExists.json().then((data) => {
                if (data) {
                    setValidationError(intl.formatMessage({
                        id: 'error_order_address_already_exists',
                        defaultMessage: 'This e-mail address is already used.',
                    }));
                    return;
                }
            });
        }).then(() => {
            setValidationError('');
        });
    }, [name, email, address, shippingCode, intl]);

    useEffect(() => {
        const shippingRegion = shippingCountryToRegion.find((country) => country.code === shippingCode)!.region;
        let orderOption;

        switch (option) {
            case CTR_OPTION_ENUM.INDIVIDUAL:
                orderOption = CTR_OPTION_ENUM.INDIVIDUAL;
                setOptionPrice(590);
                break;
            case CTR_OPTION_ENUM.PARTICIPATION:
                orderOption = CTR_OPTION_ENUM.PARTICIPATION;
                setOptionPrice(890);
                break;
            default:
                orderOption = CTR_OPTION_ENUM.INDIVIDUAL;
                setOptionPrice(590);
                break;
        }

        switch (shippingRegion) {
            case CTR_SHIPPING_ENUM.CZECHIA:
                setShippingPrice(3.5);
                break;
            case CTR_SHIPPING_ENUM.EU:
                setShippingPrice(26);
                break;
            case CTR_SHIPPING_ENUM.NORTH_AMERICA:
                setShippingPrice(31);
                break;
            case CTR_SHIPPING_ENUM.OTHER:
                setShippingPrice(40);
                break;
        }

        const order: OrderDto = {
            option: orderOption,
            shipping: shippingRegion,
            metadata: {
                name,
                organization,
                email,
                phone,
                address,
                shippingCode,
            },
        };

        if (validationError) return;

        fetch(`${apiRoot}/paywall/create-payment-intent`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(order),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [address, email, name, option, organization, phone, shippingCode, validationError]);

    const handleCountryChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setShippingCode(e.target.value);
    };

    if (option === 'success') {
        return (
            <LayoutPublicWrapper>
                <div className={'orderPage'}>
                    <h2>
                        <FormattedMessage
                            id={'label_order_success_heading'}
                            defaultMessage={'Order Complete!'}
                        />
                    </h2>
                    <p>
                        <FormattedMessage
                            id={'label_order_success_1'}
                            defaultMessage={'Thank You for Your Purchase!'}
                        />
                    </p>
                    <p>
                        <FormattedMessage
                            id={'label_order_success_2'}
                            defaultMessage={'We are excited to see your interest in digital participation and engagement, and we sincerely appreciate your trust in us. We are thrilled to announce that the Civic Tech Market Report 2025 will be available after September 3rd, when our website goes fully live. Your support is invaluable to us, and we can\'t wait to share this comprehensive report with you.'}
                        />
                    </p>
                    <p>
                        <FormattedMessage
                            id={'label_order_success_3'}
                            defaultMessage={'In the meantime, stay connected and get the latest updates by following us on {li} and {fb}.'}
                            values={{
                                li: <a href={'https://www.linkedin.com/company/participation-factory/'}
                                       target={'_blank'}>LinkedIn</a>,
                                fb: <a href={'https://www.facebook.com/participationfactory'}
                                       target={'_blank'}>Facebook</a>,
                            }}
                        />
                    </p>
                    <p>
                        <FormattedMessage
                            id={'label_order_success_4'}
                            defaultMessage={'Thank you once again for your purchase and your interest in civic technology!'}
                        />
                    </p>
                </div>
            </LayoutPublicWrapper>
        );
    } else if (option === "success-participate") {
        return (
            <LayoutPublicWrapper>
                <div className={'orderPage'}>
                    <h2>
                        <FormattedMessage
                            id={'label_order_success_heading'}
                            defaultMessage={'Order Complete!'}
                        />
                    </h2>
                    <p>
                        <FormattedMessage
                            id={'label_order_success_1'}
                            defaultMessage={'Thank You for Your Purchase!'}
                        />
                    </p>
                    <p>
                        <FormattedMessage
                            id={'label_order_success_2'}
                            defaultMessage={'We are excited to see your interest in digital participation and engagement, and we sincerely appreciate your trust in us. We are thrilled to announce that the Civic Tech Market Report 2025 will be available after September 3rd, when our website goes fully live. Your support is invaluable to us, and we can\'t wait to share this comprehensive report with you.'}
                        />
                    </p>
                    <p>
                        <FormattedMessage
                            id={'label_order_success_participate'}
                            defaultMessage={'Additionally, access to the Participate Practically course will be shared with you promptly via the email used for purchasing the Participate Practically Bundle.'}
                        />
                    </p>
                    <p>
                        <FormattedMessage
                            id={'label_order_success_3'}
                            defaultMessage={'In the meantime, stay connected and get the latest updates by following us on {li} and {fb}.'}
                            values={{
                                li: <a href={'https://www.linkedin.com/company/participation-factory/'}
                                       target={'_blank'}>LinkedIn</a>,
                                fb: <a href={'https://www.facebook.com/participationfactory'}
                                       target={'_blank'}>Facebook</a>,
                            }}
                        />
                    </p>
                    <p>
                        <FormattedMessage
                            id={'label_order_success_4'}
                            defaultMessage={'Thank you once again for your purchase and your interest in civic technology!'}
                        />
                    </p>
                </div>
            </LayoutPublicWrapper>
        )
    }

    return (
        <LayoutPublicWrapper>
            <div className={'orderPage'}>
                <h1>
                    <FormattedMessage
                        id={'label_checkout'}
                        defaultMessage={'Check-out'}
                    />
                </h1>
                <div className={'orderPage__customerForm'}>
                    <div className={'orderPage__customerFormRow'}>
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
                    </div>
                    <div className={'orderPage__customerFormRow'}>
                        <OrderInput
                            label={intl.formatMessage({ id: 'label_phone', defaultMessage: 'Phone' })}
                            state={phone}
                            setState={setPhone}
                        />
                        <OrderInput
                            label={intl.formatMessage({
                                id: 'label_organization',
                                defaultMessage: 'Organization/Institution',
                            })}
                            state={organization}
                            setState={setOrganization}
                        />
                    </div>
                    <OrderInput
                        label={intl.formatMessage({ id: 'label_address', defaultMessage: 'Address' })}
                        required={true}
                        state={address}
                        setState={setAddress}
                    />
                    <label htmlFor={name} className={'selectLabel'}>
                        {`${intl.formatMessage({
                            id: 'label_shipping_country',
                            defaultMessage: 'Shipping country',
                        })}*`}
                        <select className={'countrySelect'} onChange={handleCountryChange}
                                value={shippingCode ?? undefined}>
                            {shippingCountrySelectArray.map((option) => {
                                    return (
                                        <option
                                            key={option.label}
                                            value={option.value || ''}
                                        >
                                            {option.label}
                                        </option>
                                    );
                                },
                            )}
                        </select>
                    </label>
                </div>
                <div>
                    <h2>
                        <FormattedMessage
                            id={'label_items'}
                            defaultMessage={'Items'}
                        />
                    </h2>
                    <div className={'orderPage__itemsList'}>
                        <OrderItem
                            label={option === CTR_OPTION_ENUM.PARTICIPATION ? intl.formatMessage({ id: 'label_order_option_b', defaultMessage: 'Participate option' }) :  intl.formatMessage({ id: 'label_order_option_a', defaultMessage: 'Individual option' })}
                            price={optionPrice}
                        />
                        <OrderItem
                            label={intl.formatMessage({ id: 'label_order_shipping', defaultMessage: 'Shipping' })}
                            price={shippingPrice}
                        />
                        <OrderItem
                            label={intl.formatMessage({ id: 'label_order_total', defaultMessage: 'Total' })}
                            price={optionPrice + shippingPrice}
                            total={true}
                        />
                    </div>
                </div>
                {validationError
                    ? <p className={'orderPage__error'}>{validationError}</p>
                    : clientSecret && (
                    <Elements options={{
                        clientSecret,
                        appearance: {
                            theme: 'stripe',
                        },
                    }} stripe={stripePromise}>
                        <CheckoutForm option={option as CTR_OPTION_ENUM} />
                    </Elements>
                )}
            </div>
        </LayoutPublicWrapper>
    );
};

export default OrderPage;