import 'express-async-errors'; //must always be the first, ideal for error handling

import { IncomingMessage, ServerResponse } from 'http';

import cors from 'cors';
import express, { Express, RequestHandler } from 'express';
import { validateApiKey } from 'middlewares/validateApiKey';
import morgan from 'morgan';
// import apiRouter from 'routes';
import { renderIndex, url } from 'utils/helpers';

const PORT = process.env.PORT || '3001';
const PUBLIC_URL = url(PORT);
const app: Express = express();

// create a database connection based on the ./ormconfig.ts file

/* 
Middlewares: every time you see "app.use" we are including a new
middleware to the express server, you can read more about middle wares here:
https://developer.okta.com/blog/2018/09/13/build-and-understand-express-middleware-through-examples
*/
app.use(
  '/api/v1/stripe/webhook',
  express.raw({ type: '*/*' }) as RequestHandler,
);
app.use(cors()); //disable CORS validations
app.use(
  (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ): void => {
    if (req.originalUrl === '/api/v1/stripe/webhook') {
      next();
    } else {
      express.json({ limit: '50mb' })(
        req,
        res as ServerResponse<IncomingMessage>,
        next,
      );
    }
  },
);
app.use(morgan('dev') as RequestHandler); //logging

// render home website with usefull information for boilerplate developers (students)
app.get('/', (_, res) =>
  renderIndex(app, PUBLIC_URL).then(html => res.status(404).send(html)),
);

// import the routes from the ./routes/index.ts file
app.use(validateApiKey);
// app.use(apiRouter);

// default empty route for 404
app.use((_, res) => res.status(404).json({ message: 'Not found' }));

export default app;

module.exports = app;
