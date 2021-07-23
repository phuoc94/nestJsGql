import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type AuthorsDocument = Authors & Document;

@Schema()
export class Authors {
  @Prop()
  name: string;

  @Prop()
  born: number;

  @Prop()
  books: { type: MongooseSchema.Types.ObjectId; ref: 'Books' }[];

  id: MongooseSchema.Types.ObjectId;
}

export const AuthorsSchema = SchemaFactory.createForClass(Authors);
