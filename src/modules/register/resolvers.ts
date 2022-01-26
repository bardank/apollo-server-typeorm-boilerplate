import { User } from "../../entity/User";
// import * as bcrypt from "bcryptjs";

// Provide resolver functions for your schema fields
export const resolvers = {
  Query: {
    login: async (_: any, args: any) => {
      const { email } = args;
      const user = await User.findOne({
        where: { email },
        select: ["id", "fullName", "email"],
      });
      console.log(user);
      return user;
    },
  },
  Mutation: {
    register: async (_: any, args: any) => {
      const { fullName, email, password } = args;
      try {
        const user = User.create({
          fullName,
          email,
          password,
        });

        await user.save();
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
};
