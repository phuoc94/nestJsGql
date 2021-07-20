import { Int, Query, Resolver } from '@nestjs/graphql';
import { BooksService } from './books.service';
@Resolver()
export class BooksResolver {
  constructor(private readonly booksService: BooksService) {}

  @Query((returns) => Int)
  bookCount(): Promise<number> {
    return this.booksService.countAll();
  }
}
