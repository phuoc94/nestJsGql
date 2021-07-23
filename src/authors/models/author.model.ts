import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Schema } from 'mongoose';

@ObjectType()
export class Author {
  @Field(() => ID)
  id: Schema.Types.ObjectId;

  @Field(() => String)
  name: string;

  @Field(() => Int, { nullable: true })
  born?: number;

  @Field(() => Int, { nullable: true })
  bookCount?: number;
}
