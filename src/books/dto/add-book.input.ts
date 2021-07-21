import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class AddBookInput {
  @Field()
  title: string;

  @Field()
  author: string;

  @Field(() => Int)
  published: number;

  @Field(() => [String])
  genres: string[];
}
