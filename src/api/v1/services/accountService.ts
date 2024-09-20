import db from "@/utils/db";
import { errorHandler } from "@/utils/errors";
import { verifyJWT, compareHash } from "@/utils/auth";

export const deleteAccount = async (password: string, userToken: string) => {
  try {
    const token = await verifyJWT(userToken);
    if (!token) throw new Error("Invalid or missing token.");

    const foundUser = await db.user.findFirst({
      where: { id: token.userId as string },
    });

    if (!foundUser) throw new Error("User not found.");

    const passwordsMatch = await compareHash(password, foundUser.password);
    if (!passwordsMatch) throw new Error("Incorrect password.");

    try {
      await db.user.delete({
        where: { id: token.userId as string },
      });
    } catch (error) {
      throw new Error("Error deleting user from the database.");
    }

    return { action: "User deleted", user: token.userId };
  } catch (e) {
    throw errorHandler(e);
  }
};

interface AccountData {
  username?: string;
  password: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  mbti?: string;
  dob_date?: string;
  dob_time?: string;
  dob_location?: string;
}

export const updateAccount = async (data: AccountData, userToken: string) => {
  try {
    const token = await verifyJWT(userToken);
    if (!token) throw new Error("Invalid or missing token.");

    const foundUser = await db.user.findFirst({
      where: { id: token.userId as string },
    });

    if (!foundUser) throw new Error("User not found.");

    const passwordsMatch = await compareHash(data.password, foundUser.password);
    if (!passwordsMatch) throw new Error("Incorrect password.");
  } catch (e) {
    throw errorHandler(e);
  }
};
