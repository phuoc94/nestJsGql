import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './dto/create-user.input';
import { LoginInput } from './dto/login.input';
import { Token } from './models/token.model';
import { User } from './models/user.model';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => Token)
  async login(@Args('loginData') loginData: LoginInput): Promise<Token> {
    const token = await this.usersService.login(loginData);
    return token;
  }

  @Mutation(() => User)
  async createUser(
    @Args('createUserData') createUserData: CreateUserInput,
  ): Promise<User> {
    const user = await this.usersService.createUser(createUserData);
    return user;
  }
}
