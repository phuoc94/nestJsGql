import { Int, Query, Resolver } from '@nestjs/graphql';
import { AuthorsService } from './authors.service';

@Resolver()
export class AuthorsResolver {
  constructor(private readonly authorsService: AuthorsService) {}

  @Query((returns) => Int)
  authorCount(): Promise<number> {
    return this.authorsService.countAll();
  }
}
