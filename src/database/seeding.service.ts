// src/database/seeding.service.ts

import { Injectable } from '@nestjs/common';
import { UserService } from '../entities/user/user.service';
import { CreateUserDto } from '../entities/user/user.search.dto';

@Injectable()
export class SeedingService {
  constructor(private userService: UserService) {}

  async run(): Promise<void> {
    await this.seedUsers();
  }

  private async seedUsers(): Promise<void> {
    const users: CreateUserDto[] = [
      { name: 'John Doe', email: 'john@example.com' },
      { name: 'Jane Doe', email: 'jane@example.com' },
    ];

    for (const user of users) {
      await this.userService.create(user);
    }
  }
}
