import { Int, Query, Resolver } from '@nestjs/graphql';
import { AuthorsService } from './authors.service';
import { Author } from './models/author.model';

@Resolver()
export class AuthorsResolver {
  constructor(private readonly authorsService: AuthorsService) {}

  @Query(() => Int)
  authorCount(): Promise<number> {
    return this.authorsService.countAll();
  }

  @Query(() => [Author])
  allAuthors(): Promise<Author[]> {
    return this.authorsService.allAuthors();
  }
}
