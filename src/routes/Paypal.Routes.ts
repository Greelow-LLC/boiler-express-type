import { Router } from 'express';
import { safe } from '../utils/helpers';
import { handleOrderState } from '../controllers/Paypal.Controller';

const router = Router();

// Private Routes

router.get('/handleOrderState/:state/:purchaseId', safe(handleOrderState));

export default router;
