import { Field, ObjectType } from '@nestjs/graphql';
import { Expose } from 'class-transformer';

@ObjectType()
export class User {
  @Field()
  @Expose()
  id: number;

  @Field()
  @Expose()
  name: string;
}
