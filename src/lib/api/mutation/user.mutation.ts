import { arg, mutationType, nonNull } from "nexus";
import { GraphQLError } from "graphql";
import { Prisma } from "@prisma/client";
import {
  loginInputSchema,
  signupInputSchema,
  updateUserInputSchema,
} from "../../validation/schema";
import { Context } from "../context";
import { checkPassword, encodePassword, issueToken } from "../utils";
import { AuthPayload } from "../types/user.type";

const UserMutation = mutationType({
  definition(t) {
    t.nullable.field("login", {
      type: "AuthUser",
      args: {
        input: nonNull(
          arg({
            type: "UserLoginInput",
          })
        ),
      },
      validate: () => ({
        input: loginInputSchema,
      }),
      resolve: async (_, { input }, context: Context) => {
        const user = await context.prisma.user.findUnique({
          where: {
            email: input.email,
          },
        });

        if (!user) {
          throw new GraphQLError("Email or password is not correct", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: "login",
            },
          });
        }

        const { id, username, password } = user;
        const isPasswordCorrect = checkPassword(input.password, password);

        if (!isPasswordCorrect) {
          throw new GraphQLError("Email or password is not correct", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: "login",
            },
          });
        }

        const payload: AuthPayload = { userId: id, username };
        return {
          ...user,
          token: issueToken(payload),
        };
      },
    });

    t.nullable.field("signup", {
      type: "AuthUser",
      args: {
        input: nonNull(
          arg({
            type: "UserSignupInput",
          })
        ),
      },
      validate: () => ({
        input: signupInputSchema,
      }),
      resolve: async (_, { input }, context: Context) => {
        try {
          const { password, ...inputRest } = input;
          const user = await context.prisma.user.create({
            data: {
              ...inputRest,
              password: encodePassword(password),
            },
          });
          const { id, username } = user;
          const payload: AuthPayload = { userId: id, username };
          return {
            ...user,
            token: issueToken(payload),
          };
        } catch (e) {
          if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === "P2002") {
              throw new GraphQLError("Username or email had been used", {
                extensions: {
                  code: "BAD_USER_INPUT",
                  invalidArgs: "signup",
                },
              });
            }
          }
          return null;
        }
      },
    });

    t.nullable.field("updateUser", {
      type: "AuthUser",
      args: {
        input: nonNull(
          arg({
            type: "UserUpdateInput",
          })
        ),
      },
      authorize: (_, _args, ctx: Context) => !!ctx.currentUser,
      validate: () => ({
        input: updateUserInputSchema,
      }),
      resolve: async (_, { input }, context: Context) => {
        const displayData = {
          bio: true,
          email: true,
          id: true,
          image: true,
          username: true,
        };
        const origin = await context.prisma.user.findUnique({
          where: { id: context.currentUser!.id },
          select: displayData,
        });

        if (!origin) {
          throw new GraphQLError("User not found", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: "updateUser",
            },
          });
        }

        try {
          const { password, ...rest } = input;
          return await context.prisma.user.update({
            where: { id: origin.id },
            data: {
              ...rest,
              // change password
              password: !!password ? encodePassword(password) : undefined,
            },
            select: displayData,
          });
        } catch (e) {
          if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === "P2002") {
              throw new GraphQLError("Username or email had been used", {
                extensions: {
                  code: "BAD_USER_INPUT",
                  invalidArgs: "updateUser",
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

export default UserMutation;
