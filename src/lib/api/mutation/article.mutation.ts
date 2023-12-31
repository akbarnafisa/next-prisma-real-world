import { type Article, Prisma } from "@prisma/client";
import { GraphQLError } from "graphql";
import { arg, extendType, nonNull, stringArg } from "nexus";
import { articleInputSchema } from "../../validation/schema";
import type { Context } from "../context";
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

    t.nonNull.field("updateArticle", {
      type: "Article",
      args: {
        slug: nonNull(stringArg()),
        input: nonNull(arg({ type: "ArticleInput" })),
      },
      authorize: (_, _args, ctx: Context) => !!ctx.currentUser,
      validate: ({ string }) => ({
        slug: string().required(),
        input: articleInputSchema,
      }),
      resolve: async (
        _,
        { slug, input: { title, body, description, tagList } },
        context: Context
      ) => {
        const origin = await checkArticle(context, slug);
        checkArticleOwner(context, origin);
        const titleChanged = origin.title !== title;
        return context.prisma.article.update({
          where: { slug },
          data: {
            title: titleChanged ? title : undefined,
            slug: titleChanged ? slugify(title) : undefined,
            // You can use onUpdate: Ca
            tags: {
              // delete relation
              deleteMany: { articleId: origin.id },
              // connect again
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
            updateAt: new Date(),
            description,
            body,
          },
        });
      },
    });

    t.nonNull.field("favorite", {
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
        try {
          return await context.prisma.article.update({
            where: { id: origin.id },
            data: {
              favoritesCount: {
                increment: 1,
              },
              favoritedBy: { create: { userId: context.currentUser!.id } },
            },
          });
        } catch (e) {
          if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === "P2002") {
              throw new GraphQLError("Article had been favorited", {
                extensions: {
                  code: "BAD_USER_INPUT",
                  invalidArgs: "article",
                },
              });
            }
          }
          return origin;
        }
      },
    });
    t.nonNull.field("unfavorite", {
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
        try {
          return await context.prisma.article.update({
            where: { id: origin.id },
            data: {
              favoritesCount: {
                decrement: 1,
              },
              favoritedBy: {
                delete: {
                  userId_articleId: {
                    userId: context.currentUser!.id,
                    articleId: origin.id,
                  },
                },
              },
            },
          });
        } catch (e) {
          if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === "P2017") {
              throw new GraphQLError("Article had been unfavorited", {
                extensions: {
                  code: "BAD_USER_INPUT",
                  invalidArgs: "article",
                },
              });
            }
          }
          return origin;
        }
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

export async function checkArticleById(ctx: Context, id: number) {
  const origin = await ctx.prisma.article.findUnique({ where: { id } });
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
