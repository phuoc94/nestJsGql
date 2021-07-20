import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Book {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => Int)
  published: number;

  @Field(() => String)
  author: string;

  @Field(() => [String])
  genres: string[];
}
