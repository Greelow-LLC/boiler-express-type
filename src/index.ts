// start the express server, listen to requests on PORT
import app from './app';
import { dbConnection } from './ormconfig';
import 'reflect-metadata';
import { url } from './utils/helpers';

var PORT = process.env.PORT || '3001';
const PUBLIC_URL = url(PORT);

dbConnection();

let resp = app.listen(PORT, () =>
  console.log(
    `==> 😎 Listening on port ${PORT}.
   Open ${PUBLIC_URL} in your browser.`,
  ),
);
