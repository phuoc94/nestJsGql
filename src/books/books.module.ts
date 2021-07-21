import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksResolver } from './books.resolver';
import { BooksService } from './books.service';
import { Books, BooksSchema } from './schemas/books.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Books.name, schema: BooksSchema }]),
  ],
  providers: [BooksResolver, BooksService],
})
export class BooksModule {}
