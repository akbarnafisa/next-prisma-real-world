import { arg, mutationType, nonNull } from "nexus";
import { Context } from "../context";

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
      // validate: () => ({
      //   input: signupInputSchema,
      // }),
      resolve: async (_, { input }, context: Context) => {
        return {
          bio: "bio",
          email: "email",
          id: 123,
          image: "String",
          token: "String",
          username: "String!",
        };

        // try {
        //   const { password, ...inputRest } = input;
        //   const user = await context.prisma.user.create({
        //     data: {
        //       ...inputRest,
        //       password: Utility.encodePassword(password),
        //     },
        //   });
        //   const { id, username } = user;
        //   const payload = { sub: id, user: username };
        //   return { ...user, token: Utility.issueToken(payload) };
        // } catch (e) {
        //   if (e instanceof Prisma.PrismaClientKnownRequestError) {
        //     if (e.code === 'P2002') throw new UserInputError('Username or email had been used');
        //   }
        //   return null;
        // }
      },
    });
  },
});

export default UserMutation;
