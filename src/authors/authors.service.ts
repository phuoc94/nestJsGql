import { Injectable } from '@nestjs/common';
import { authors } from './data';
import { Author } from './models/author.model';

@Injectable()
export class AuthorsService {
  async countAll(): Promise<number> {
    return authors.length;
  }

  async allAuthors(): Promise<Author[]> {
    return authors;
  }
}
