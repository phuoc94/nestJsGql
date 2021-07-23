import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type AuthorsDocument = Authors & Document;

@Schema()
export class Authors {
  @Prop()
  name: string;

  @Prop()
  born: number;

  @Prop()
  books: { type: mongoose.Schema.Types.ObjectId; ref: 'Books' }[];

  @Prop()
  id: string;
}

export const AuthorsSchema = SchemaFactory.createForClass(Authors);
