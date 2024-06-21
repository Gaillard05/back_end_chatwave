import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Cats {
  @Field(type => Int)
  id!: number;

  @Field()
  name!: string;

  @Field(type => Int)
  age!: number;

  @Field()
  breed!: string;
}
