import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Authors, AuthorsSchema } from '../authors/schemas/authors.schema';
import { BooksResolver } from './books.resolver';
import { BooksService } from './books.service';
import { Books, BooksSchema } from './schemas/books.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Books.name, schema: BooksSchema },
      { name: Authors.name, schema: AuthorsSchema },
    ]),
  ],
  providers: [BooksResolver, BooksService],
})
export class BooksModule {}
