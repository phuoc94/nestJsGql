import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import * as dotenv from 'dotenv';
import { BooksModule } from '../src/books/books.module';
import { allAuthorsWbookCountQuery } from './querys/authors';
import { AuthorsModule } from '../src/authors/authors.module';
import {
  addBookNewAuthorQuery,
  addBookQuery,
  allBooksQuery,
  NewBook,
  NewBookNewAuthor,
} from './querys/books';

dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI;

describe('addbooks', () => {
  let app;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        BooksModule,
        AuthorsModule,
        MongooseModule.forRoot(MONGODB_URI),
        GraphQLModule.forRoot({
          autoSchemaFile: 'schema.gql',
        }),
      ],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });
  afterAll(async () => {
    await app.close();
  });

  it('addBook (author is already in server)', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: addBookQuery,
      })
      .expect(({ body }) => {
        const data = body.data.addBook;
        expect(data.title).toBe(NewBook.title);
        expect(data.author).toBe(NewBook.author);
      })
      .expect(200);
  });

  it('check is added book', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: allBooksQuery,
      })
      .expect(({ body }) => {
        const data = body.data.allBooks;
        expect(data.length).toBeGreaterThan(0);
        const book = data.find((book) => book.title === NewBook.title);
        expect(book.title).toBe(NewBook.title);
        expect(book.author).toBe(NewBook.author);
        expect(book.published).toBe(NewBook.published);
        expect(book.genres.length).toBeGreaterThan(0);
        expect(book.genres[0]).toBe(NewBook.genres[0]);
      })
      .expect(200);
  });

  it('addBook (author not in server)', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: addBookNewAuthorQuery,
      })
      .expect(({ body }) => {
        const data = body.data.addBook;
        expect(data.title).toBe(NewBookNewAuthor.title);
        expect(data.author).toBe(NewBookNewAuthor.author);
      })
      .expect(200);
  });

  it('allAuthors check is new author added', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: allAuthorsWbookCountQuery,
      })
      .expect(({ body }) => {
        const data = body.data.allAuthors;
        expect(data.length).toBeGreaterThan(0);
        const author = data.find(
          (author) => author.name === NewBookNewAuthor.author,
        );
        expect(author.name).toBe(NewBookNewAuthor.author);
        expect(author.bookCount).toBe(NewBookNewAuthor.bookCount);
        expect(author.born).toBe(null);
      })
      .expect(200);
  });
});
