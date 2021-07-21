import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AddBookInput {
  @Field()
  title: string;

  @Field()
  author: string;

  @Field()
  published: number;

  @Field(() => [String])
  genres: string[];
}
