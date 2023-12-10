// src/database/seeding.module.ts

import { Module } from '@nestjs/common';
import { SeedingService } from './seeding.service';
import { UserModule } from '../entities/user/user.module';

@Module({
  imports: [UserModule],
  providers: [SeedingService],
})
export class SeedingModule {}
