import { ApolloError } from "apollo-server-core";
import { User } from "../../entity/User";
import { ResolverMap } from "../../types/graphql-utils";
import { duplicateEmail } from "./errorMessages";
// Provide resolver functions for your schema fields
export const resolvers: ResolverMap = {
  RegisterResult :{
       __resolveType(obj:any) {
      if (obj.node) {
        return 'Error';
      }      
      if (obj.message) {
        return 'Sucess';
      }      return null;
      
    }
  },
  Mutation: {
    register: async (_: any, args: GQL.IRegisterOnMutationArguments) => {
      try {
        const { fullName, email, password } = args;

        const userAlreadyExists = await User.findOne({
          where: { email },
          select: ["id"],
        });

        const error = {
            node: "email",
            message: duplicateEmail,
        };

        if (userAlreadyExists) {
          return error
        }

        const user = User.create({
          fullName,
          email,
          password,
        });
        
        await user.save();
        return error;
      } catch (error) {
        console.log(error);
        throw new ApolloError(error);
      }
    }
  },
};
