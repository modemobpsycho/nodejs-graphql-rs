import { Type } from '@fastify/type-provider-typebox';
import { GraphQLSchema } from 'graphql';

import { Mutation } from './mutations.js';
import { Query } from './queries.js';

export const gqlResponseSchema = Type.Partial(
  Type.Object({
    data: Type.Any(),
    errors: Type.Any(),
  }),
);

export const createGqlResponseSchema = {
  body: Type.Object(
    {
      query: Type.String(),
      variables: Type.Optional(Type.Record(Type.String(), Type.Any())),
    },
    {
      additionalProperties: false,
    },
  ),
};

export const gqlRootSchema = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});
