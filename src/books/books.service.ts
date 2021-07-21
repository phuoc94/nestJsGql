import { Injectable } from '@nestjs/common';
import { authors, pushToAuthors } from 'src/authors/data';
import { v4 as uuidv4 } from 'uuid';
import { books, pushToBooks } from './data';
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
    pushToBooks(book);

    //If the author is not yet saved to the server
    const authorName = addBookInput.author;
    const findAuthor = authors.filter((author) => author.name === authorName);
    if (findAuthor.length < 1) {
      const author = { name: authorName, id: uuidv4() };
      pushToAuthors(author);
    }

    return book;
  }
}
