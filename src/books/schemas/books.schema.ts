import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Authors } from 'src/authors/schemas/authors.schema';

export type BooksDocument = Books & Document;

@Schema()
export class Books {
  @Prop()
  title: string;

  @Prop()
  published: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Authors' })
  author: Authors;

  @Prop([String])
  genres: string[];

  @Prop()
  id: string;
}

export const BooksSchema = SchemaFactory.createForClass(Books);
