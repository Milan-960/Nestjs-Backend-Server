import * as dotenv from 'dotenv';
import * as path from 'path';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

dotenv.config();

const migrationsPath = path.join(__dirname, '..', '..', 'migration', '*.ts');

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [path.join(process.cwd(), '**', '*.entity.{ts,js}')],
  migrations: [migrationsPath],
  synchronize: process.env.NODE_ENV !== 'production',
  logging: true,
  migrationsRun: true,
};

export default databaseConfig;
