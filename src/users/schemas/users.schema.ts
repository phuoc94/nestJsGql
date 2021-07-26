import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type UsersDocument = Users & Document;

@Schema()
export class Users {
  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  favoriteGenre: string;

  id: MongooseSchema.Types.ObjectId;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
