import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, MinLength } from 'class-validator';

@InputType()
export class EditAuthorInput {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field(() => Int)
  @IsInt()
  setBornTo: number;
}
