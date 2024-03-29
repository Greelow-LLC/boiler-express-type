import app from 'app';
import { dbConnection } from 'ormconfig';
import request from 'supertest';

const PORT = process.env.PORT || '3001';

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
    const response = await request(app).get(
      `/api/v1/errors?api-key=${process.env.API_KEY}`,
    );
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual([]);
  });
});
