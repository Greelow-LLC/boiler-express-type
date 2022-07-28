import { Router } from 'express';
import { safe } from '../utils/helpers';
import { handleOrderState } from '../controllers/Paypal.Controller';

export const routerPaypal = Router();

// Private Routes

routerPaypal.get(
  '/api/v1/paypal/handleOrderState/:state/:purchaseId',
  safe(handleOrderState),
);
