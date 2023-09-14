import { ApolloServerPluginCacheControl } from "@apollo/server/plugin/cacheControl";
import { ApolloServerPluginLandingPageDisabled } from "@apollo/server/plugin/disabled";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { GraphQLError } from "graphql";
import { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../lib/api/prisma";
import { schema } from "../../lib/api/schema";

let apiHandler: ReturnType<typeof startServerAndCreateNextHandler>;

async function getApiHandler() {
  const pluginDisabled =
    process.env.NODE_ENV === "development"
      ? []
      : [ApolloServerPluginLandingPageDisabled()];

  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    introspection: true,
    plugins: [
      ApolloServerPluginCacheControl({ defaultMaxAge: 5 }),
      ...pluginDisabled,
    ],
    persistedQueries: { ttl: 1500 },
    formatError: (err) => {
      if (
        err.message === "Not authorized" // nexus authorize plugin error message
      ) {
        throw new GraphQLError("Unauthorized", {
          extensions: {
            code: "UNAUTHENTICATED",
            path: err.path,
            locations: err.locations,
          },
        });
      } else if (
        err.message.includes("prisma") ||
        err.message.includes("database")
      ) {
        throw new GraphQLError(
          "Your query doesn't match the schema. Try double-checking it!",
          {
            extensions: {
              code: "INTERNAL_SERVER_ERROR",
              path: err.path,
              locations: err.locations,
            },
          }
        );
      }
      return err;
    },
  });

  if (!apiHandler) {
    apiHandler = startServerAndCreateNextHandler(server, {
      context: async (req, res) => ({ req, res, prisma }),
    });
  }
  return apiHandler;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const apiHandler = await getApiHandler();
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }
  return apiHandler(req, res);
}

