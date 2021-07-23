import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Authors } from '../../authors/schemas/authors.schema';

export type BooksDocument = Books & Document;

@Schema()
export class Books {
  @Prop()
  title: string;

  @Prop()
  published: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Authors' })
  author: Authors;

  @Prop([String])
  genres: string[];

  id: MongooseSchema.Types.ObjectId;
}

export const BooksSchema = SchemaFactory.createForClass(Books);
