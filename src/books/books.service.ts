import { Injectable } from '@nestjs/common';
import { books } from './data';
@Injectable()
export class BooksService {
  async countAll(): Promise<number> {
    return books.length;
  }
}
