import { User } from "../../../entity/User";
import { ResolverMap } from "../../../types/graphql-utils";
import { ApolloError } from "apollo-server-core";
import { userNotFound } from "./errorMessages";

const errorResponse = {errors : [
  {
    node: "user",
    message: userNotFound,
  },
]};

export const resolvers: ResolverMap = {
  Me: {
    __resolveType(obj: any) {
      if (obj.errors) {
        return "Errors";
      } else if (obj.email) {
        return "User";
      }
      return null;
    },
  },
  Query: {
    me: async (_: any, __: any, {user}) => {
      try {
        if (!user) {
          return {errors: errorResponse};
        }
        const { id } = user;
        const queryUser = await User.findOne({
          where: { id },
          select: ["id", "fullName", "email"],
        });
        if (!queryUser) {
          return {errors: errorResponse};
        }

        return user;
      } catch (error) {
        return new ApolloError(error);
      }
    },
  },
};
