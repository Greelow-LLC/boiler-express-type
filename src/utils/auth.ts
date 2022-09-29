import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export const cryptPass = (password: string) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

export const comparePass = (reqPass: string, userPass: string): boolean => {
  return bcrypt.compareSync(reqPass, userPass);
};

export interface userTokenPayload {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
}

export const createJwt = (user: userTokenPayload) => {
  return new Promise((resolve, reject) => {
    const payload = { user };

    jwt.sign(
      payload,
      process.env.JWT_SECRET_SEED as string,
      {
        expiresIn: '2h',
      },
      (error, token) => {
        if (error) {
          console.warn(error);
          reject('No se generó el token');
        }
        resolve(token);
      },
    );
  });
};
