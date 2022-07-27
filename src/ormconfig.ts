const dotenv = require('dotenv-override');
dotenv.config({ override: true }); // load .env variables
import { DataSource } from 'typeorm';
import { join } from 'path';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  timezone: '+00:00',
  entities: [join(__dirname, 'entities', '*.{ts,js}')],
  logging: false,
  synchronize: process.env.NODE_ENV === 'production' ? false : true,
  migrations: [join(__dirname, 'migrations', '*.{ts,js}')],
  ssl:
    process.env.NODE_ENV === 'development'
      ? false
      : {
          require: true,
          rejectUnauthorized: false,
        },
});

export const dbConnection = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Conectado a la DB :)');
    return AppDataSource;
  } catch (error) {
    console.log('error en la base de datos', error);
  }
};
