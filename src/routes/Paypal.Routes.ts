import { handleOrderState } from 'controllers/Paypal.Controller';
import { Router } from 'express';
import { safe } from 'utils/helpers';

const router = Router();

// Private Routes

router.get('/handleOrderState/:state/:purchaseId', safe(handleOrderState));

export default router;
