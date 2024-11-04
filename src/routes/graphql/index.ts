import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema, gqlRootSchema } from './schemas.js';
import { graphql, parse, validate } from 'graphql';
import depthLimit from 'graphql-depth-limit';
import { gqlLoaders } from './loaders/loaders.js';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;

  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req, reply) {
      const { query, variables } = req.body;

      const loaders = gqlLoaders(prisma);

      const validationErrors = validate(gqlRootSchema, parse(query), [depthLimit(5)]);
      if (validationErrors.length > 0) {
        await reply.send({ errors: validationErrors });
      }
      const result = await graphql({
        schema: gqlRootSchema,
        source: query,
        variableValues: variables,
        contextValue: {
          prisma,
          loaders,
        },
      });

      return result;
    },
  });
};

export default plugin;
