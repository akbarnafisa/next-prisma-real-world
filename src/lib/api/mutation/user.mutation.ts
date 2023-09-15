import { arg, mutationType, nonNull } from "nexus";
import { GraphQLError } from "graphql";
import { Prisma } from "@prisma/client";
import { signupInputSchema } from "../../validation/schema";
import { Context } from "../context";
import { encodePassword, issueToken } from "../utils";

const UserMutation = mutationType({
  definition(t) {
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
          const payload = { userId: id, username };
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
  },
});

export default UserMutation;
