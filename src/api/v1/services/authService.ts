import { errorHandler } from "@/utils/errors";
import db from "@/utils/db";
import { userSchema, User } from "../schemas/userSchema";

export const signup = async (user: User) => {
  try {
    const newUser = userSchema.parse(user);

    db.user.create({
      data: newUser
    });

  } catch (e) {
    throw errorHandler(e);
  };
};
