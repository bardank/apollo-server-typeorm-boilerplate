import jwt from "jsonwebtoken";
import { User } from "../entity/User";
import { DecodedToken } from "../types/graphql-utils";

const getUser = async (token: any) => {
  if (!token) {
    return null;
  }
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as DecodedToken;

    if (!decoded) {
      return null;
    }

    const user = await User.findOne({
      where: {
        id: decoded.user.id
      },
      select: ["id", "fullName", "email"],
    });

    return user;
  } catch (error) {
    return null;
  }
};

export default getUser;
