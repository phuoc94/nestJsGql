import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsResolver } from './authors.resolver';
import { BooksService } from 'src/books/books.service';

@Module({
  providers: [AuthorsService, AuthorsResolver, BooksService],
})
export class AuthorsModule {}
