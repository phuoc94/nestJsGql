import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { authors, pushToAuthors } from '../authors/data';
import { v4 as uuidv4 } from 'uuid';
import { books, pushToBooks } from './data';
import { AddBookInput } from './dto/add-book.input';
import { AllBookArgs } from './dto/all-books.args';
import { Book } from './models/book.model';
import { Books, BooksDocument } from './schemas/books.schema';
import { Authors, AuthorsDocument } from 'src/authors/schemas/authors.schema';
import { UserInputError } from 'apollo-server-express';
@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Books.name) private readonly booksModel: Model<BooksDocument>,
    @InjectModel(Authors.name)
    private readonly authorsModel: Model<AuthorsDocument>,
  ) {}
  async countAll(): Promise<number> {
    return await this.booksModel.collection.countDocuments();
  }

  async allBooks(allBookArgs: AllBookArgs): Promise<Book[]> {
    if (!allBookArgs.author && !allBookArgs.genre) {
      return await this.booksModel.find({}).populate('author');
    }

    if (allBookArgs.author && allBookArgs.genre) {
      const author = await this.authorsModel.findOne({
        name: allBookArgs.author,
      });
      return await this.booksModel
        .find({ author, genres: allBookArgs.genre })
        .populate('author');
    }

    if (allBookArgs.author) {
      const author = await this.authorsModel.findOne({
        name: allBookArgs.author,
      });
      return await this.booksModel.find({ author }).populate('author');
    }

    if (allBookArgs.genre) {
      return await this.booksModel
        .find({ genres: allBookArgs.genre })
        .populate('author');
    }
  }

  async countByAuthorName(author): Promise<number> {
    return await this.booksModel.find({ author }).countDocuments();
  }

  async addBook(addBookInput: AddBookInput): Promise<Books> {
    // Get Input Author
    const author = await this.authorsModel.findOne({
      name: addBookInput.author,
    });
    // IF Author Not found
    if (author === null) {
      // Create New Author
      const NewAuthor = new this.authorsModel({
        name: addBookInput.author,
        born: null,
      });
      //Try SAVE New Author
      try {
        await NewAuthor.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: addBookInput,
        });
      }

      //Create New Book
      const NewBook = new this.booksModel({ ...addBookInput, author });
      // Try Update Author Books & Save New Book
      try {
        NewAuthor.books = NewAuthor.books.concat(NewBook._id);
        await NewAuthor.save();
        await NewBook.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: addBookInput,
        });
      }

      // return new created book
      return NewBook;
    }
    // inputted Author is already in database
    else {
      // Create new book
      const NewBook = new this.booksModel({ ...addBookInput, author });
      // Try Update Author Books & Save New Book
      console.log('newBook', NewBook);
      console.log('author', author);

      try {
        author.books = author.books.concat(NewBook._id);
        await author.save();
        await NewBook.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: addBookInput,
        });
      }

      // return new created book
      return NewBook;
    }
  }
}
