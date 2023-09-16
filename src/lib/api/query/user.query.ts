import { nonNull, queryType, stringArg } from "nexus";
import { Context } from "../context";
import { User } from "@prisma/client";

const UserQuery = queryType({
  definition(t) {
      t.field('profile', {
        type: 'Profile',
        args: {
          username: nonNull(stringArg())
        },
        validate: ({ string }) => ({
          username: string().required(),
        }),
        resolve: (_, { username }, context: Context) => {
          return context.prisma.user.findUnique({
            where: { username },
          });
        },
      })

      t.nonNull.field('currentUser', {
        type: 'AuthUser',
        authorize: (_, _args, ctx: Context) => !!ctx.currentUser,
        resolve: async (_, _args, ctx: Context) => {
          const user = await ctx.prisma.user.findUnique({
            where: {
              id: ctx.currentUser?.id
            }
          })
          return user as User
        }
      })
  },
})

export default UserQuery;