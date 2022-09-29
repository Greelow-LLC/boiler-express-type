import axios from 'axios';
import { Request, Response } from 'express';
import { getPaypalToken } from 'utils/paypal';

export const handleOrderState = async (req: Request, res: Response) => {
  const { token } = req.query;
  try {
    const access_token = await getPaypalToken();

    if (req.params.state === 'success') {
      await axios.post(
        `https://api-m.sandbox.paypal.com/v2/checkout/orders/${token}/capture`,
        {},
        {
          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${access_token}`,
          },
        },
      );

      return res.json('SUCCESS');
    }

    return res.json('CANCELED');
  } catch (error: any) {
    return res.status(error?.status || 400).json({
      message: error?.message || error?.msg || error,
      code: error?.codeError || 0,
      descri: error?.descriError || '',
    });
  }
};
