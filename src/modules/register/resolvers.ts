import { User } from "../../entity/User";
import { ResolverMap } from "../../types/graphql-utils";
import {  ApolloError } from "apollo-server-express";

// Provide resolver functions for your schema fields
export const resolvers: ResolverMap = {
  Mutation: {
    register: async (_: any, args) => {
      try {
        const { fullName, email, password } = args;

        const userAlreadyExists = await User.findOne({
          where: { email },
          select: ["id"],
        });

        if (userAlreadyExists) {
          throw new ApolloError("Email is already registred." ,  "403");
        }

        const user = User.create({
          fullName,
          email,
          password,
        });

        await user.save();
        return true;
      } catch (error) {
        throw new ApolloError(error.message, '500');
      }
    },
  },
};
