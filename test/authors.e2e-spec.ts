import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import * as dotenv from 'dotenv';
import { AuthorsModule } from '../src/authors/authors.module';
import {
  allAuthorsWbookCountQuery,
  Author,
  authorCountQuery,
} from './querys/authors';

dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI;

describe('Authors (e2e)', () => {
  let app;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
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

  it('authorCount', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: authorCountQuery,
      })
      .expect(({ body }) => {
        const data = body.data.authorCount;
        expect(data).toBe(Author.authorCount);
      })
      .expect(200);
  });

  it('allAuthors With bookCount', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: allAuthorsWbookCountQuery,
      })
      .expect(({ body }) => {
        const data = body.data.allAuthors;
        expect(data.length).toBeGreaterThan(0);
        const author = data[0];
        expect(author.name).toBe(Author.name);
        expect(author.bookCount).toBe(Author.bookCount);
      })
      .expect(200);
  });
});
