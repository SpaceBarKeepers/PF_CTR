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

const stripePromise = loadStripe('pk_test_51PcnIgRuy3DzAnAUck92B3nZ4PeL82buh0C5HxWIBsnVXWGX2WyOg3UxFB5PLYiAB0zQVXU8uYXXuhtwo4fEO8Ae00h7TE7Ecz');

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
                setOptionPrice(500);
                break;
            case CTR_OPTION_ENUM.PARTICIPATION:
                orderOption = CTR_OPTION_ENUM.PARTICIPATION;
                setOptionPrice(1000);
                break;
            default:
                orderOption = CTR_OPTION_ENUM.INDIVIDUAL;
                setOptionPrice(500);
                break;
        }

        switch (shippingRegion) {
            case CTR_SHIPPING_ENUM.CZECHIA:
                setShippingPrice(10);
                break;
            case CTR_SHIPPING_ENUM.EU:
                setShippingPrice(20);
                break;
            case CTR_SHIPPING_ENUM.NORTH_AMERICA:
                setShippingPrice(30);
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
            }
        };

        if (validationError) return

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
                    <h1>
                        <FormattedMessage
                            id={'label_order_success'}
                            defaultMessage={'Order success'}
                        />
                    </h1>
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
                            label={intl.formatMessage({ id: 'label_order_option_a', defaultMessage: 'Option A' })}
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
                        <CheckoutForm />
                    </Elements>
                )}
                {/*<ButtonColored*/}
                {/*    onClick={handleOrderClick}*/}
                {/*    childIsLink={false}*/}
                {/*>*/}
                {/*    <FormattedMessage*/}
                {/*        id={'label_order_and_pay'}*/}
                {/*        defaultMessage={'Order and pay'}*/}
                {/*    />*/}
                {/*</ButtonColored>*/}
            </div>
        </LayoutPublicWrapper>
    );
};

export default OrderPage;