import { Int, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { BooksService } from 'src/books/books.service';
import { AuthorsService } from './authors.service';
import { Author } from './models/author.model';

@Resolver(() => Author)
export class AuthorsResolver {
  constructor(
    private readonly authorsService: AuthorsService,
    private readonly booksService: BooksService,
  ) {}

  @Query(() => Int)
  authorCount(): Promise<number> {
    return this.authorsService.countAll();
  }

  @Query(() => [Author])
  allAuthors(): Promise<Author[]> {
    return this.authorsService.allAuthors();
  }

  @ResolveField()
  async bookCount(@Parent() author: Author) {
    const { name } = author;
    return this.booksService.countByAuthorName(name);
  }
}
