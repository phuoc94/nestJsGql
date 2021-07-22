import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Author } from 'src/authors/models/author.model';
import { Authors } from 'src/authors/schemas/authors.schema';

@ObjectType()
export class Book {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => Int)
  published: number;

  @Field(() => Author)
  author: Authors;

  @Field(() => [String])
  genres: string[];
}
