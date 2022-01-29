import bcrypt from "bcryptjs";
import { User } from "../../../entity/User";
import { ResolverMap } from "../../../types/graphql-utils";
import { createSendToken } from "../../../utils/authController";
import { ApolloError } from "apollo-server-core";
import { formatYupError } from "../../../utils/formatYupError";
import { ValidationError } from "yup";
import { UserAuthenticationRules } from "../../../validations/user";
import { invalidCredentials } from "./errorMessages";

const errorResponse = {
  errors: [
    {
      node: "credentials",
      message: invalidCredentials,
    },
  ],
};

export const resolvers: ResolverMap = {
  LoginResult: {
    __resolveType(obj: any) {
      if (obj.errors) {
        return "Errors";
      } else if (obj.token) {
        return "Login";
      }
      return null;
    },
  },
  Query: {
    login: async (_: any, args: GQL.ILoginOnQueryArguments) => {
      try {
        await UserAuthenticationRules.validate(args, { abortEarly: false });
        const { email, password } = args;
        const user = await User.findOne({
          where: { email },
        });

        if (!user) {
          return errorResponse;
        }

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
          return errorResponse;
        }

        const token = createSendToken(user.id);
        return {
          token,
          user: {
            id: user.id,
            fullName: user.fullName,
            email: user.email,
          },
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
