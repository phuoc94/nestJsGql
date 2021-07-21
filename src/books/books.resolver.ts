import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { BooksService } from './books.service';
import { AllBookArgs } from './dto/all-books.args';
import { Book } from './models/book.model';
@Resolver(() => Book)
export class BooksResolver {
  constructor(private readonly booksService: BooksService) {}

  @Query(() => Int)
  bookCount(): Promise<number> {
    return this.booksService.countAll();
  }

  @Query(() => [Book])
  allBooks(@Args() allBookArgs: AllBookArgs): Promise<Book[]> {
    return this.booksService.allBooks(allBookArgs);
  }
}
