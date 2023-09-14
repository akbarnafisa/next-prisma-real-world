import { nonNull, queryType, stringArg } from "nexus";
import { Context } from "../context";

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
  },
})

export default UserQuery;