import { Int, Query, Resolver } from '@nestjs/graphql';
import { BooksService } from './books.service';
import { Book } from './models/book.model';
@Resolver(() => Book)
export class BooksResolver {
  constructor(private readonly booksService: BooksService) {}

  @Query(() => Int)
  bookCount(): Promise<number> {
    return this.booksService.countAll();
  }

  @Query(() => [Book])
  allBooks(): Promise<Book[]> {
    return this.booksService.allBooks();
  }
}
