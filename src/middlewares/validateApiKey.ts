import { NextFunction, Request, Response } from 'express';
import { customError } from 'utils/helpers';

const allowedPaths = ['confirm-user', 'paypal', 'stripe'];

export const validateApiKey = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const apiKey = req.headers['api-key'];

    let allowPath = false;
    allowedPaths.forEach(path => {
      if (`${req.path}/`.startsWith(`/api/v1/${path}/`)) {
        return (allowPath = true);
      }
    });

    if (allowPath) return next();

    if (!apiKey) throw await customError('No api key provided', 6);
    if (apiKey !== process.env.API_KEY)
      throw await customError('Invalid API key', 6);

    next();
  } catch (error: any) {
    return res.status(error?.status || 400).json({
      message: error?.message || error?.msg || error,
      code: error?.codeError || 0,
      descri: error?.descriError || '',
    });
  }
};
