import { Field, ArgsType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@ArgsType()
export class AllBookArgs {
  @Field({ nullable: true })
  @IsOptional()
  author?: string;

  @Field({ nullable: true })
  @IsOptional()
  genre?: string;
}
