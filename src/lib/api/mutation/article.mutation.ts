import { Article, Prisma } from "@prisma/client";
import { GraphQLError } from "graphql";
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

    t.nonNull.field("deleteArticle", {
      type: "Article",
      args: {
        slug: nonNull(stringArg()),
      },
      authorize: (_, _args, ctx: Context) => !!ctx.currentUser,
      validate: ({ string }) => ({
        slug: string().required(),
      }),
      resolve: async (_, { slug }, context: Context) => {
        const origin = await checkArticle(context, slug);
        checkArticleOwner(context, origin);
        return context.prisma.article.delete({
          where: { slug },
          // data: {
          //   del: true,
          //   tags: { deleteMany: { articleId: origin.id } },
          //   favoritedBy: { deleteMany: { articleId: origin.id } },
          //   comments: {
          //     updateMany: {
          //       where: { del: false },
          //       data: { del: true },
          //     },
          //   },
          // },
        });
      },
    });
  },
});

export async function checkArticle(ctx: Context, slug: string) {
  const origin = await ctx.prisma.article.findUnique({ where: { slug } });
  if (!origin || origin.del) {
    throw new GraphQLError("Article not found", {
      extensions: {
        code: "BAD_USER_INPUT",
        invalidArgs: "article",
      },
    });
  }
  return origin;
}

function checkArticleOwner(ctx: Context, article: Article) {
  if (ctx.currentUser!.id !== article.authorId) {
    throw new GraphQLError("Unauthorized", {
      extensions: {
        code: "UNAUTHENTICATED",
        invalidArgs: "article",
      },
    });
  }
}

export default ArticleMutation;
