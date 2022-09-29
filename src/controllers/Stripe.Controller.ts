import dotenv from 'dotenv';
import { Request, Response } from 'express';
import Stripe from 'stripe';
import { stripe } from 'utils/stripe';

dotenv.config();

export const getPublishableKey = (_: Request, res: Response): void => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
};

export const createWebHook = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const event: Stripe.Event = stripe.webhooks.constructEvent(
      req.body,
      req.headers['stripe-signature'] as Buffer | string | string[],
      process.env.STRIPE_WEBHOOK_SECRET as string,
    );

    // ---- Handle all events here ----

    const events: any = {
      'payment_intent.created': (): void =>
        console.log('💰 PaymentIntent created'),
      'payment_intent.succeeded': (): void =>
        console.log('💰 PaymentIntent succeeded'),
      'payment_intent.payment_failed': (): void =>
        console.log('💰 PaymentIntent failed'),
      'payment_intent.canceled': (): void =>
        console.log('💰 PaymentIntent canceled'),
    };

    res.sendStatus(200);
    if (!events[event.type]) return console.log('💰 Unhandled event type');
    return events[event.type]();
  } catch (err) {
    console.log(`⚠️  Webhook signature verification failed.`);
    res.sendStatus(400);
    return;
  }
};
