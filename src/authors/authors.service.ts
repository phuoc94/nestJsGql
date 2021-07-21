import { Injectable } from '@nestjs/common';
import { authors, updateAuthors } from './data';
import { EditAuthorInput } from './dto/edit-author.input';
import { Author } from './models/author.model';

@Injectable()
export class AuthorsService {
  async countAll(): Promise<number> {
    return authors.length;
  }

  async allAuthors(): Promise<Author[]> {
    return authors;
  }

  async editAuthor(authorInput: EditAuthorInput): Promise<Author> {
    const author = authors.find((author) => author.name === authorInput.name);
    if (!author) {
      return null;
    }
    const updatedAuthor = { ...author, born: authorInput.setBornTo };
    updateAuthors(updatedAuthor);
    return updatedAuthor;
  }
}
