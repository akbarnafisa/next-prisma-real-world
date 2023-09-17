import { Prisma } from "@prisma/client";
import { GraphQLError } from "graphql";
import { extendType, nonNull, stringArg } from "nexus";
import { Context } from "../context";

const ProfileMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("follow", {
      type: "Profile",
      args: {
        username: nonNull(stringArg()),
      },
      authorize: (_, _args, ctx: Context) => !!ctx.currentUser,
      validate: ({ string }) => ({
        username: string().required(),
      }),
      resolve: async (_, { username }, context: Context) => {
        const following = await checkProfile(context, username);

        return await context.prisma.user.update({
          where: {
            id: following.id,
          },
          data: {
            followedBy: {
              // maybe using connectOrCreate because followed and following in two ways?
              connectOrCreate: {
                where: {
                  followerId_followingId: {
                    followerId: context.currentUser!.id,
                    followingId: following.id,
                  },
                },
                create: { followerId: context.currentUser!.id },
              },
            },
          },
        });
      },
    });

    t.nonNull.field("unFollow", {
      type: "Profile",
      args: {
        username: nonNull(stringArg()),
      },
      authorize: (_, _args, ctx: Context) => !!ctx.currentUser,
      validate: ({ string }) => ({
        username: string().required(),
      }),
      resolve: async (_, { username }, context: Context) => {
        const following = await checkProfile(context, username);

        try {
          return await context.prisma.user.update({
            where: {
              id: following.id,
            },
            data: {
              followedBy: {
                delete: {
                  followerId_followingId: {
                    followerId: context.currentUser!.id,
                    followingId: following.id,
                  },
                },
              },
            },
          });
        } catch (e) {
          if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === "P2017") {
              throw new GraphQLError("Had been unfollowed", {
                extensions: {
                  code: "BAD_USER_INPUT",
                  invalidArgs: "follow",
                },
              });
            }
          }
          return following;
        }
      },
    });
  },
});

const checkProfile = async (ctx: Context, username: string) => {
  const following = await ctx.prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!following) {
    throw new GraphQLError("User not found", {
      extensions: {
        code: "BAD_USER_INPUT",
        invalidArgs: "follow",
      },
    });
  }

  return following;
};

export default ProfileMutation;
