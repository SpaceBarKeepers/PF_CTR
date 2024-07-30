import { useEffect, useState } from 'react';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import ButtonColored from '../Button/ButtonColored';
import { FormattedMessage } from 'react-intl';

export default function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState<string|null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!stripe) {
            return;
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
            'payment_intent_client_secret',
        );

        if (!clientSecret) {
            return;
        }

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch (paymentIntent?.status) {
                case 'succeeded':
                    setMessage('Payment succeeded!');
                    break;
                case 'processing':
                    setMessage('Your payment is processing.');
                    break;
                case 'requires_payment_method':
                    setMessage('Your payment was not successful, please try again.');
                    break;
                default:
                    setMessage('Something went wrong.');
                    break;
            }
        });
    }, [stripe]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js hasn't yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                // return_url: 'http://localhost:5173/order/success',
                return_url: 'https://civictechreport.com/order/success',
                shipping: {
                    name: 'Krasomil Mladistfvý',
                    address: {
                        line1: '510 Townsend St',
                        postal_code: '98140',
                        city: 'San Francisco',
                        state: 'CA',
                        country: 'US',
                    },
                }
            },
        });

        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`. For some payment methods like iDEAL, your customer will
        // be redirected to an intermediate site first to authorize the payment, then
        // redirected to the `return_url`.
        if (error.type === 'card_error' || error.type === 'validation_error') {
            setMessage(error.message as string);
        } else {
            setMessage('An unexpected error occurred.');
        }

        setIsLoading(false);
    };

    return (
        <form id="payment-form" onSubmit={handleSubmit}>

            <PaymentElement id="payment-element" options={{
                layout: 'tabs',
            }} />
            {/*<AddressElement options={addressElementOptions} />*/}
            <ButtonColored
                childIsLink={false}
                disabled={isLoading || !stripe || !elements}
                id="submit"
                style={{ marginTop: '20px' }}
            >
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : <FormattedMessage
              id={'label_order_and_pay'}
              defaultMessage={'Order and pay'}
          />}
        </span>
            </ButtonColored>
            {/* Show any error or success messages */}
            {message && <div id="payment-message">{message}</div>}
        </form>
    );
}