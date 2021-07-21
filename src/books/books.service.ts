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
    let filteredbooks = books;

    if (allBookArgs.author) {
      filteredbooks = filteredbooks.filter(
        (book) => book.author === allBookArgs.author,
      );
    }

    if (allBookArgs.genre) {
      filteredbooks = filteredbooks.filter((book) =>
        book.genres.includes(allBookArgs.genre),
      );
    }

    return filteredbooks;
  }

  async countByAuthorName(author): Promise<number> {
    const authorBooks = books.filter((book) => book.author === author);
    return authorBooks.length;
  }
}
