import {
  createError,
  deleteError,
  getErrorById,
  getErrors,
  updateError,
} from 'controllers/Errors.controller';
import { Errors } from 'entities/Errors';
import { Router } from 'express';
import { validateId } from 'middlewares';
import { safe } from 'utils/helpers';

const router = Router();

// public routes

router.get('/', safe(getErrors));

router.get('/:id', validateId(Errors), safe(getErrorById));

//private routes

router.post('/', safe(createError));

router.put('/:id', validateId(Errors), safe(updateError));

router.delete('/:id', validateId(Errors), safe(deleteError));

export default router;
