import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BooksService } from './books.service';
import { AddBookInput } from './dto/add-book.input';
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
  @Mutation(() => Book)
  async addBook(@Args('addBookData') addBookData: AddBookInput): Promise<Book> {
    const book = await this.booksService.addBook(addBookData);
    return book;
  }
}
