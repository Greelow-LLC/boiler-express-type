import axios from 'axios';
const dotenv = require('dotenv-override');
dotenv.config({ override: true });

export const getPaypalToken = async () => {
  const params = new URLSearchParams();
  params.append('grant_type', 'client_credentials');

  const {
    data: { access_token },
  } = await axios.post(
    'https://api-m.sandbox.paypal.com/v1/oauth2/token',
    params,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      auth: {
        username: process.env.PAYPAL_CLIENT_ID as string,
        password: process.env.PAYPAL_CLIENT_SECRET as string,
      },
    },
  );
  return access_token;
};

export const createPaypalOrder = async (currency: string) => {
  try {
    const order = {
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: currency,
            value: 100,
          },
          description: 'test',
        },
      ],
      application_context: {
        return_url: `http://localhost:3001/api/v1/paypal/handleOrderState/success/1`,
        cancel_url: `http://localhost:3001/api/v1/paypal/handleOrderState/canceled/1`,
        brand_name: 'GiftTime',
      },
    };
    const access_token = await getPaypalToken();

    const { data } = await axios.post(
      `${process.env.PAYPAL_API}/v2/checkout/orders`,
      order,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    );

    return data.links[1].href;
  } catch (error: any) {
    return error.response.data.message;
  }
};
