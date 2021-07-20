import { Injectable } from '@nestjs/common';
import { books } from './data';
import { Book } from './models/book.model';
@Injectable()
export class BooksService {
  async countAll(): Promise<number> {
    return books.length;
  }

  async allBooks(): Promise<Book[]> {
    return books;
  }
}