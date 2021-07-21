import { Field, ArgsType } from '@nestjs/graphql';

@ArgsType()
export class AllBookArgs {
  @Field({ nullable: true })
  author?: string;
}
