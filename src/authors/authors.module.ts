import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthorsService } from './authors.service';
import { AuthorsResolver } from './authors.resolver';
import { BooksService } from 'src/books/books.service';
import { Authors, AuthorsSchema } from './schemas/authors.schema';
import { Books, BooksSchema } from 'src/books/schemas/books.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Authors.name, schema: AuthorsSchema },
      { name: Books.name, schema: BooksSchema },
    ]),
  ],
  providers: [AuthorsService, AuthorsResolver, BooksService],
})
export class AuthorsModule {}
