import * as path from 'path'; // node.js internal module usefull to get file paths

import dotenv from 'dotenv';
import ejs from 'ejs'; //template engine
import { Errors } from 'entities/Errors';
import { Request, Response, NextFunction } from 'express';
import listEndpoints from 'express-list-endpoints'; //just a function that retrieves all the API routes
import { findOne } from 'services';
import { ObjectLiteral } from 'typeorm';

dotenv.config();

// We need to know what will be the API host
// in a local computer is always "localhost"
// but in gitpod if varies depending on the workspace URL
export const url = (port: string) => {
  let publicUrl = `http://localhost:${port}`;
  // Gitpod has internal environment variables https://www.gitpod.io/docs/environment-variables/
  // the Workspace URL is one of them (thank God)
  if (process.env.GITPOD_WORKSPACE_URL) {
    const [, host] = process.env.GITPOD_WORKSPACE_URL.split('://');
    publicUrl = `https://${port}-${host}`;
  }
  return publicUrl;
};

// this function creates the HTML/CSS for the API Index home page
export const renderIndex = async (_app: any, url: string) => {
  // loop all the endpoints that the user has generated
  const routes = listEndpoints(_app)
    .map((item: any) => {
      const endpoints: ObjectLiteral[] = [];
      item.methods.forEach((e: string) => {
        endpoints.push({ method: e, path: item.path });
      });
      return endpoints;
    })
    .flat()
    //remove the home page rout because its obvious
    .filter((r: ObjectLiteral) => r.path != '/');

  // data to be sent to the home page
  const data = {
    host: url,
    routes,
    logo: 'https://raw.githubusercontent.com/Greelow-LLC/boiler-express-type/develop/docs/assets/logo.png',
    starter: 'https://start.4geeksacademy.com/starters/express',
  };
  return new Promise((resolve, reject) => {
    // use the EJS template engine to generate the HTML/CSS
    ejs.renderFile(
      path.join(__dirname, '../../docs/assets/template.ejs'),
      data as ejs.Data,
      (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      },
    );
  });
};

//.sort((a,b) => a.method > b.method)

export const safe =
  (fn: any) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res);
    } catch (err: any) {
      res.status(err?.status || 400).json({
        message: err?.message || err?.msg || err,
        code: err?.codeError || 0,
        descri: err?.descriError || '',
      });

      next(err);
    }
  };

export class Exception extends Error {
  status = 400;
  codeError = 0;
  descriError = '';
  constructor(
    msg: string,
    status = 400,
    codeError?: number,
    descriError?: string,
  ) {
    super();
    this.status = status || 400;
    this.message = msg;
    this.codeError = codeError || 0;
    this.descriError = descriError || '';
  }
}

export const fetchError = async (code: number) => {
  try {
    return await findOne(Errors, { where: { code } });
  } catch (error) {
    return null;
  }
};

export const customError = async (msg: string, code: number) => {
  const error = await fetchError(code);
  return new Exception(msg, error?.status || 406, error?.code, error?.descri);
};

export const importDynamicRoute = async (path: string) =>
  (await import(path)).default;

export const lowerCaseFirstLetter = (s: string): string =>
  s.charAt(0).toLowerCase() + s.slice(1);
