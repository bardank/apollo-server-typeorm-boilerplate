import { User } from "../../entity/User";
import { ResolverMap } from "../../types/graphql-utils";
import { createSendToken } from "../../utils/authController";
import { ApolloError, AuthenticationError } from "apollo-server-core";

export const resolvers : ResolverMap = {
  Query: {
    login: async (_: any, args) => {
      try {
        const { email } = args;
        const user = await User.findOne({
          where: { email },
          select: ["id", "fullName", "email"],
        });
        if (user) {
          const token = createSendToken(user.id);
          return { token, user };
        }else{
          throw new AuthenticationError("Invalid Credentails")
        }
      } catch (error) {
        throw new ApolloError(error.message, "500");
      }
    },
  }
};
