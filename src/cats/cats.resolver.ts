import { Resolver, Query, ObjectType, Field } from '@nestjs/graphql';

@ObjectType() // Définissez l'objet GraphQL avec ses champs
class OkResponse {
  @Field()
  result!: string;
}

@Resolver()
export class CatsResolver {

  @Query(() => OkResponse) // Spécifiez le type de retour comme OkResponse
  async getOk(): Promise<OkResponse> {
    return { result: 'ok' }; // Retournez une instance de OkResponse
  }
}
