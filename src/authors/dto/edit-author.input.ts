import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class EditAuthorInput {
  @Field()
  name: string;

  @Field(() => Int)
  setBornTo: number;
}
