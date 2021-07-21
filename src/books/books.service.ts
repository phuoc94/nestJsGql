import { Injectable } from '@nestjs/common';
import { books } from './data';
import { AllBookArgs } from './dto/all-books.args';
import { Book } from './models/book.model';
@Injectable()
export class BooksService {
  async countAll(): Promise<number> {
    return books.length;
  }

  async allBooks(allBookArgs: AllBookArgs): Promise<Book[]> {
    if (!allBookArgs.author) {
      return books;
    }
    return books.filter((b) => b.author === allBookArgs.author);
  }

  async countByAuthorName(author): Promise<number> {
    const authorBooks = books.filter((b) => b.author === author);
    return authorBooks.length;
  }
}
