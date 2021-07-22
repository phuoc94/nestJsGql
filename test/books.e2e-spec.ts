import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import * as dotenv from 'dotenv';
import { BooksModule } from '../src/books/books.module';
import {
  allBooksByAuthorNameQuery,
  allBooksByGenreAndAuthorQuery,
  allBooksByGenreQuery,
  allBooksQuery,
  Book,
  bookCountQuery,
} from './querys/books';

dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI;

describe('Books (e2e)', () => {
  let app;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        BooksModule,
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

  it('bookCount', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: bookCountQuery,
      })
      .expect(({ body }) => {
        const data = body.data.bookCount;
        expect(data).toBe(Book.bookCount);
      })
      .expect(200);
  });

  it('allBooks', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: allBooksQuery,
      })
      .expect(({ body }) => {
        const data = body.data.allBooks;
        expect(data.length).toBeGreaterThan(0);
        const book = data[0];
        expect(book.title).toBe(Book.title);
        expect(book.author).toBe(Book.author);
        expect(book.published).toBe(Book.published);
        expect(book.genres.length).toBeGreaterThan(0);
        expect(book.genres[0]).toBe(Book.genres[0]);
      })
      .expect(200);
  });

  it('allBooks by author', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: allBooksByAuthorNameQuery,
      })
      .expect(({ body }) => {
        const data = body.data.allBooks;
        expect(data.length).toBeGreaterThan(0);
        const book = data[0];
        expect(book.title).toBe(Book.title);
      })
      .expect(200);
  });

  it('allBooks by genres', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: allBooksByGenreQuery,
      })
      .expect(({ body }) => {
        const data = body.data.allBooks;
        expect(data.length).toBeGreaterThan(0);
        const book = data[0];
        expect(book.title).toBe(Book.title);
        expect(book.author).toBe(Book.author);
      })
      .expect(200);
  });

  it('allBooks by genres & author', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: allBooksByGenreAndAuthorQuery,
      })
      .expect(({ body }) => {
        const data = body.data.allBooks;
        expect(data.length).toBeGreaterThan(0);
        const book = data[0];
        expect(book.title).toBe(Book.title);
        expect(book.author).toBe(Book.author);
      })
      .expect(200);
  });
});
