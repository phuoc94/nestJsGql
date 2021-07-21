import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AuthorsDocument = Authors & Document;

@Schema()
export class Authors {
  @Prop()
  name: string;

  @Prop()
  born: number;

  @Prop()
  id: string;
}

export const AuthorsSchema = SchemaFactory.createForClass(Authors);
