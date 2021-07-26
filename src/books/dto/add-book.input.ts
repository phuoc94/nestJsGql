import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsNumberString, Max, Min } from 'class-validator';
@InputType()
export class AddBookInput {
  @Field()
  @IsNotEmpty()
  title: string;

  @Field()
  @IsNotEmpty()
  author: string;

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  published: number;

  @Field(() => [String])
  genres: string[];
}
