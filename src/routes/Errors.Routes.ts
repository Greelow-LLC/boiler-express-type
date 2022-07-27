import { Router } from 'express';
import {
  createError,
  deleteError,
  getErrorById,
  getErrors,
  updateError,
} from '../controllers/Errors.controller';
import { safe } from '../utils/helpers';

export const routerErrors = Router();

// public routes

routerErrors.get('/api/v1/errors', safe(getErrors));

routerErrors.get('/api/v1/errors/:id', safe(getErrorById));

//private routes

routerErrors.post('/api/v1/errors', safe(createError));

routerErrors.put('/api/v1/errors/:id', safe(updateError));

routerErrors.delete('/api/v1/errors/:id', safe(deleteError));
