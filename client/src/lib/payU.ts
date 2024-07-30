//TESTING:
export const posID = '483659';

export const getAuthToken = async () => {
    // TESTING:
    const url = 'https://secure.snd.payu.com/pl/standard/user/oauth/authorize';
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('client_id', '483659');
    params.append('client_secret', '366402480ee2a5e48f1704f876847dba');

    // PRODUCTION:
    // const url = 'https://secure.payu.com/pl/standard/user/oauth/authorize';
    // const params = new URLSearchParams();
    // params.append('grant_type', 'client_credentials');
    // params.append('client_id', '4331650');
    // params.append('client_secret', '619c9c538b5c4bd77ccf46eba1fa2d63');

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching the token:', error);
    }
}

interface Product {
    name: string;
    unitPrice: string;
    quantity: string;
}

interface Order {
    customerIp: string;
    merchantPosId: string;
    description: string;
    currencyCode: string;
    totalAmount: string;
    products: Product[];
}

export const createOrder = async(token: string, order: Order) => {
    // TESTING:
    const url = 'https://secure.snd.payu.com/api/v2_1/orders';
    // PRODUCTION:
    // const url = 'https://secure.payu.com/api/v2_1/orders';

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(order)
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}