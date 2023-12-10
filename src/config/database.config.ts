import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import * as path from 'path';

dotenv.config();
const migrationsPath = path.join(__dirname, '..', '..', 'migration', '*.ts');

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [path.join(__dirname, '**', '*.entity.{ts,js}')],
  migrations: [migrationsPath],
  synchronize: process.env.NODE_ENV !== 'production',
  logging: true,
  logger: 'advanced-console',
  migrationsRun: true,
});

export default AppDataSource;
