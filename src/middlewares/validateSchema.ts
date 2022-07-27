import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { fetchError } from '../utils/helpers';

export const validateSchema =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const customError = await fetchError(3);
        return res.status(406).json({
          message: error.issues.flat().map(issue => issue.message),
          code: customError?.code || 0,
          descri: customError?.descri || '',
        });
      }
    }
  };
