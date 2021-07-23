import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserInputError } from 'apollo-server-express';
import { Model } from 'mongoose';
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
    return await this.authorsModel.collection.countDocuments();
  }

  async allAuthors(): Promise<Author[]> {
    return await this.authorsModel.find();
  }

  async editAuthor(authorInput: EditAuthorInput): Promise<Author> {
    const author = await this.authorsModel.findOne({ name: authorInput.name });
    if (!author) {
      return null;
    }

    author.born = authorInput.setBornTo;
    try {
      await author.save();
    } catch (error) {
      throw new UserInputError(error.message, {
        invalidArgs: authorInput,
      });
    }
    return author;
  }

  async authorBookCount(author): Promise<number> {
    const authorData = await this.authorsModel.findOne({
      name: author,
    });

    return authorData.books.length;
  }
}
