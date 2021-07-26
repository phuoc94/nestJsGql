import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Schema } from 'mongoose';

@ObjectType()
export class User {
  @Field(() => ID)
  id: Schema.Types.ObjectId;

  @Field(() => String)
  username: string;

  @Field(() => String)
  favoriteGenre: string;
}
