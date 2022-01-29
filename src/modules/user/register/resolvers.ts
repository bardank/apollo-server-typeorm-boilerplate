import { ApolloError } from "apollo-server-core";
import { User } from "../../../entity/User";
import { ResolverMap } from "../../../types/graphql-utils";
import { ValidationError } from "yup";
import { formatYupError } from "../../../utils/formatYupError";
import { userRegistrationRules } from "../../../validations/user";
import { duplicateEmail, userCreated } from "./errorMessages";

export const resolvers: ResolverMap = {
  RegisterResult: {
    __resolveType(obj: any) {
      if (obj.errors) {
        return "Errors";
      } else if (obj.statusCode === "200") {
        return "Success";
      }
      return null;
    },
  },
  Mutation: {
    register: async (_: any, args: GQL.IRegisterOnMutationArguments) => {
      try {
        await userRegistrationRules.validate(args, { abortEarly: false });
        const { fullName, email, password } = args;

        const userAlreadyExists = await User.findOne({
          where: { email },
          select: ["id"],
        });

        const errors = [
          {
            node: "email",
            message: duplicateEmail,
          },
        ];

        if (userAlreadyExists) {
          return { errors };
        }

        const user = User.create({
          fullName,
          email,
          password,
        });

        await user.save();
        return {
          message: userCreated,
          statusCode: "200",
        };
      } catch (error) {
        if (error instanceof ValidationError) {
          return formatYupError(error);
        } else {
          return new ApolloError(error);
        }
      }
    },
  },
};
