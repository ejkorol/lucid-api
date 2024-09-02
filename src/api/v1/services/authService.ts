import db from "@/utils/db";
import { errorHandler } from "@/utils/errors";
import { hashPassword, compareHash, issueJWT } from "@/utils/auth";
import {
  userSchema,
  User,
  Credentials,
  credentialSchema
} from "../schemas/userSchema";

export const signup = async (user: User) => {
  try {
    const newUser = userSchema.parse(user);

    const hashedPassword = await hashPassword(newUser.password);

    await db.user.create({
      data: {
        ...newUser,
        password: hashedPassword
      },
    });

  } catch (e) {
    throw errorHandler(e);
  };
};

export const signin = async (credentials: Credentials) => {
  try {
    const parsedCredentials = credentialSchema.parse(credentials);

    const user = await db.user.findUnique({
      where: {
        email: parsedCredentials.email
      }
    });

    if (!user) {
      throw new Error();
    };

    const passwordValid = await compareHash(credentials.password, user.password);

    if (passwordValid) {
      const token = await issueJWT(user)
      console.log(token);
      return token;
    };

    console.log(parsedCredentials);
  } catch(e) {
    throw errorHandler(e);
  };
};

export const verify = async (credential: string) => {
  try {
    const found = await db.user.findFirst({
      where: {
        OR: [
          { username: credential },
          { email: credential }
        ]
      }
    });

    if (found) return { status: true };
    return { status: false };
  } catch(e) {
    throw errorHandler(e);
  };
};
