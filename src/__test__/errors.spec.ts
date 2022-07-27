import app from '../app';
import { dbConnection } from '../ormconfig';
import { url } from '../utils/helpers';
import request from 'supertest';

var PORT = process.env.PORT || '3001';
const PUBLIC_URL = url(PORT);

let connection: any, server: any;

beforeAll(async () => {
  connection = await dbConnection();
  server = app.listen(PORT);
});

afterAll(done => {
  connection.close();
  server.close();
  done();
});

describe('Errors tests', () => {
  it('get errors', async () => {
    const response = await request(app).get('/api/v1/errors');
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual([]);
  });
});
