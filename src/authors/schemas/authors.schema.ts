import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Book } from 'src/books/models/book.model';
import { Books } from 'src/books/schemas/books.schema';

export type AuthorsDocument = Authors & Document;

@Schema()
export class Authors {
  @Prop()
  name: string;

  @Prop()
  born: number;

  @Prop()
  books: { type: mongoose.Schema.Types.ObjectId; ref: 'Books' }[];
}

export const AuthorsSchema = SchemaFactory.createForClass(Authors);
