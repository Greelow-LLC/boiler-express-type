import { Router } from 'express';
import {
  createWebHook,
  getPublishableKey,
} from '../controllers/Stripe.Controller';
import { safe } from '../utils/helpers';

const router = Router();

// Private Routes

router.get('/get-publishable-key', safe(getPublishableKey));

router.post('/webhook', createWebHook);

// Public Routes

export default router;
