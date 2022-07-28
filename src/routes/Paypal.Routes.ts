import { Router } from 'express';
import { handleOrderState } from 'controllers/Paypal.Controller';
import { safe } from 'utils/helpers';

export const routerPaypal = Router();

// Private Routes

routerPaypal.get(
  '/api/v1/paypal/handleOrderState/:state/:purchaseId',
  safe(handleOrderState),
);
