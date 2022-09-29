import { Request, Response } from 'express';
import { getAllErrors } from 'services/Errors.Services';

export const getErrors = async (_: Request, res: Response): Promise<Response> =>
  res.json(await getAllErrors());
