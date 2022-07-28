import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2020-08-27',
  appInfo: {
    name: 'giftTime-stripe',
    version: '0.0.2',
  },
  typescript: true,
});

export const createPaymentIntent = async (
  currency: string,
  paymentType: string[],
) => {
  try {
    const params: Stripe.PaymentIntentCreateParams = {
      amount: 10000,
      currency,
      payment_method_types: paymentType ? paymentType : ['card'],
    };

    const paymentIntent: Stripe.PaymentIntent =
      await stripe.paymentIntents.create(params);

    return paymentIntent;
  } catch (e: any) {
    console.log(e);
  }
};
