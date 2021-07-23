import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Author } from '../../authors/models/author.model';
import { Authors } from '../../authors/schemas/authors.schema';

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
