import { registerAs } from '@nestjs/config';
import {
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USERNAME,
} from 'src/helpers/development-env';
import { DataSource, DataSourceOptions } from 'typeorm';

const config: DataSourceOptions = {
  type: 'postgres',
  database: DB_NAME,
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  logging: false,
  synchronize: true,
  dropSchema: false

};

export default registerAs('typeorm', () => config);

export const connectionSource = new DataSource(config);
