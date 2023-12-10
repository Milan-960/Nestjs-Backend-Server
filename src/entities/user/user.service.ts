import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './user.search.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    this.logger.log('Fetching all users');
    return this.userRepository.find();
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    this.logger.log(`Creating user: ${JSON.stringify(createUserDto)}`);
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }
}
