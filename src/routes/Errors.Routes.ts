import { getErrors } from 'controllers/Errors.controller';
import { Router } from 'express';
import { safe } from 'utils/helpers';

const router = Router();

// public routes

router.get('/', safe(getErrors));

export default router;
