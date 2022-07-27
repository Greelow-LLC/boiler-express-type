import jwt from 'jsonwebtoken';
import { Response, Request, NextFunction } from 'express';
import { customError, Exception } from '../utils/helpers';

const allowedPaths = [
  'adminLogin',
  'login',
  'register',
  'social',
  'stripe/webhook',
];

export const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let allowPath = false;
    allowedPaths.forEach(path => {
      if (`${req.path}/`.startsWith(`/api/v1/${path}/`)) {
        return (allowPath = true);
      }
    });

    if (allowPath) return next();

    const token = `${req.path}/`.startsWith('/api/v1/confirm-user/')
      ? req.params.token
      : req.headers?.authorization?.split(' ')[1];

    if (!token) throw await customError('No token provided', 6);

    const isRefreshToken = req.path === '/api/v1/refresh-token';

    jwt.verify(
      token,
      process.env.JWT_SECRET_SEED as string,
      {
        ignoreExpiration: isRefreshToken,
      },
      (err: any, decoded: any) => {
        if (err) {
          throw new Exception(
            `Wrong ${!isRefreshToken ? 'or expired ' : ''}token`,
            !isRefreshToken ? 401 : 410,
          );
        }
        res.locals.user = decoded;
      },
    );

    next();
  } catch (error: any) {
    return res.status(error?.status || 400).json({
      message: error?.message || error?.msg || error,
      code: error?.status === 410 ? 5 : 6 || 0,
      descri: error?.status === 410 ? 'Expired resource' : 'Unauthorized' || '',
    });
  }
};
