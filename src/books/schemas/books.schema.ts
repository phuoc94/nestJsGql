import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BooksDocument = Books & Document;

@Schema()
export class Books {
  @Prop()
  title: string;

  @Prop()
  published: number;

  @Prop()
  author: string;

  @Prop([String])
  genres: string;

  @Prop()
  id: string;
}

export const BooksSchema = SchemaFactory.createForClass(Books);
