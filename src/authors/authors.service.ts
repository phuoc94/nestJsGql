import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { authors, updateAuthors } from './data';
import { EditAuthorInput } from './dto/edit-author.input';
import { Author } from './models/author.model';
import { Authors, AuthorsDocument } from './schemas/authors.schema';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectModel(Authors.name)
    private readonly authorsModel: Model<AuthorsDocument>,
  ) {}

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
