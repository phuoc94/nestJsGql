import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { books, pushToBook } from './data';
import { AddBookInput } from './dto/add-book.input';
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

  async addBook(addBookInput: AddBookInput): Promise<Book> {
    const book = { ...addBookInput, id: uuidv4() };
    pushToBook(book);
    return book;
  }
}
