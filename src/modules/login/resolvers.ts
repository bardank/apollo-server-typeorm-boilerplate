import { User } from "../../entity/User";
import { ResolverMap } from "../../types/graphql-utils";
import { createSendToken } from "../../utils/authController";
import { ApolloError } from "apollo-server-core";
import { duplicateEmail } from "../register/errorMessages";

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
        }
        return {
          node: "email",
          message: duplicateEmail,
        };
        // }else{
        //   throw new AuthenticationError("Invalid Credentails")
        // }
      } catch (error) {
        throw new ApolloError(error.message, "500");
      }
    },
  }
};
