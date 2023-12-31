import type { Comment } from "@prisma/client";
import { arg, extendType, intArg, nonNull, stringArg } from "nexus";
import { GraphQLError } from "graphql";
import { commentInputSchema } from "../../validation/schema";
import type { Context } from "../context";
import { checkArticle } from "./article.mutation";

const CommentMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createComment", {
      type: "Comment",
      args: {
        slug: nonNull(stringArg()),
        input: nonNull(arg({ type: "CommentInput" })),
      },
      authorize: (_, _args, ctx: Context) => !!ctx.currentUser,
      validate: ({ string }) => ({
        slug: string().required(),
        input: commentInputSchema,
      }),
      resolve: async (_, { slug, input: { body } }, context: Context) => {
        await checkArticle(context, slug);
        return context.prisma.comment.create({
          data: {
            body,
            article: { connect: { slug } },
            author: { connect: { id: context.currentUser!.id } },
          },
        });
      },
    });
    t.nonNull.field("deleteComment", {
      type: "Comment",
      args: {
        id: nonNull(intArg()),
      },
      authorize: (_, _args, ctx: Context) => !!ctx.currentUser,
      validate: ({ number }) => ({
        id: number().required(),
      }),
      resolve: async (_, { id }, context: Context) => {
        const origin = await checkComment(context, id);
        checkCommentOwner(context, origin);
        return context.prisma.comment.delete({
          where: { id },
          // data: { del: true },
        });
      },
    });
  },
});

async function checkComment(ctx: Context, id: number) {
  const origin = await ctx.prisma.comment.findUnique({ where: { id } });
  if (!origin || origin.del) {
    throw new GraphQLError("Comment not found", {
      extensions: {
        code: "BAD_USER_INPUT",
      },
    });
  }

  return origin;
}



function checkCommentOwner(ctx: Context, comment: Comment) {
  if (ctx.currentUser!.id !== comment.authorId){
    throw new GraphQLError("Unauthorized", {
      extensions: {
        code: "UNAUTHENTICATED",
      },
    });
  }
}

export default CommentMutation;
