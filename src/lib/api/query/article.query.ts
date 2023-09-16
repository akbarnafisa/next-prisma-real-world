import { Prisma } from "@prisma/client";
import { extendType, intArg, nonNull, stringArg } from "nexus";
import { Context } from "../context";

const ArticleQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("article", {
      type: "Article",
      args: {
        slug: nonNull(stringArg()),
      },
      validate: ({ string }) => ({
        slug: string().required(),
      }),
      resolve: (_, { slug }, context: Context) => {
        return context.prisma.article.findUnique({ where: { slug } });
      },
    });
  },
});

export default ArticleQuery;
