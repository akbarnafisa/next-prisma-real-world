import { nonNull, queryType, stringArg } from "nexus";
import { Context } from "../context";
import { User } from "@prisma/client";

const UserQuery = queryType({
  definition(t) {
    t.field("profile", {
      type: "Profile",
      args: {
        username: nonNull(stringArg()),
      },
      validate: ({ string }) => ({
        username: string().required(),
      }),
      resolve: (_, { username }, context: Context) => {
        return context.prisma.user.findUnique({
          where: { username },
        });
      },
    });

    t.nonNull.field("currentUser", {
      type: "AuthUser",
      authorize: (_, _args, ctx: Context) => !!ctx.currentUser,
      resolve: async (_, _args, ctx: Context) => {
        const user = await ctx.prisma.user.findUnique({
          where: {
            id: ctx.currentUser?.id,
          },
        });
        return user as User;
      },
    });

    t.string("checkUsername", {
      authorize: (_, _args, ctx: Context) => !!ctx.currentUser,
      args: {
        username: nonNull(stringArg()),
      },
      validate: ({ string }) => ({
        username: string().required(),
      }),
      resolve: async (_, { username }, ctx: Context) => {
        const user = await ctx.prisma.user.findUnique({
          select: {
            username: true,
          },
          where: {
            username,
          },
        });
        return user && user.username;
      },
    });
    // TODO: check the UI if sending empty field
    t.string("checkEmail", {
      authorize: (_, _args, ctx: Context) => !!ctx.currentUser,
      args: {
        email: nonNull(stringArg()),
      },
      validate: ({ string }) => ({
        email: string().required(),
      }),
      resolve: async (_, { email }, ctx: Context) => {
        const user = await ctx.prisma.user.findUnique({
          select: {
            email: true,
          },
          where: {
            email,
          },
        });
        return user && user.email;
      },
    });
  },
});

export default UserQuery;
