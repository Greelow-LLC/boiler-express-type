import {
  createWebHook,
  getPublishableKey,
} from 'controllers/Stripe.Controller';
import { Router } from 'express';
import { safe } from 'utils/helpers';

const router = Router();

router.get('/get-publishable-key', safe(getPublishableKey));

router.post('/webhook', createWebHook);

export default router;
