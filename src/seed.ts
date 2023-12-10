// src/seed.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SeedingService } from './database/seeding.service';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const seedingService = app.get(SeedingService);
  await seedingService.run();
  await app.close();
}
bootstrap();
