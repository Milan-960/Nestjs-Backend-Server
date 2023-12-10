import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateUserDto } from 'src/dtos/user/create-user.dto';
import { User } from 'src/entities/user/user.entity';
import { UserService } from 'src/entities/user/user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User], { name: 'users' })
  async getUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Mutation(() => User, { name: 'createUser' })
  async createUser(
    @Args('createUserInput') createUserDto: CreateUserDto,
  ): Promise<User> {
    return this.userService.create(createUserDto);
  }
}
