import { Article, Prisma } from "@prisma/client";
import { arg, extendType, nonNull, stringArg } from "nexus";
import { articleInputSchema } from "../../validation/schema";
import { Context } from "../context";
import { slugify } from "../utils";

const ArticleMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createArticle", {
      type: "Article",
      args: {
        input: nonNull(arg({ type: "ArticleInput" })),
      },
      authorize: (_, _args, ctx: Context) => !!ctx.currentUser,
      validate: () => ({
        input: articleInputSchema,
      }),
      resolve: (
        _,
        { input: { title, description, body, tagList } },
        context: Context
      ) => {
        return context.prisma.article.create({
          data: {
            title,
            description,
            body,
            author: { connect: { id: context.currentUser!.id } },
            slug: slugify(title),
            tags: {
              create: tagList?.map((name: string) => {
                return {
                  tag: {
                    connectOrCreate: {
                      where: { name },
                      create: { name },
                    },
                  },
                };
              }),
            },
          },
        });
      },
    });
  },
});

export default ArticleMutation;
