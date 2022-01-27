import jwt from "jsonwebtoken";

export const createSendToken  = (userId : string) => {
  const payload = {
    user: {
      id: userId,
    },
  };
  const token = jwt.sign(
    payload,
    process.env.JWT_SECRET as string,
  );
  return token
};

