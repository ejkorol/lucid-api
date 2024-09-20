import db from "@/utils/db";
import { errorHandler } from "@/utils/errors";
import { hashPassword, compareHash, issueJWT } from "@/utils/auth";
import { getSigns } from "@/utils/birthChart";
import { format } from "date-fns";

interface SignupData {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  mbti: string;
  dobDate: string;
  dobTime: string;
  birthCountry: string;
  birthState: string;
  birthCity: string;
}

export const signup = async (user: SignupData) => {
  try {
    const hashedPassword = await hashPassword(user.password);

    const formattedDates = {
      dobDate: format(user.dobDate, "yyyy-MM-dd"),
      dobTime: format(user.dobTime, "HH:mm:ss"),
    };

    const zodiacs = getSigns(formattedDates.dobDate, formattedDates.dobTime);

    await db.$transaction(async (tx) => {
      const createdUser = await tx.user.create({
        data: {
          first_name: user.firstName,
          last_name: user.lastName,
          email: user.email,
          mbti: user.mbti,
          dob_date: formattedDates.dobDate,
          dob_time: formattedDates.dobTime,
          birth_country: user.birthCountry,
          birth_state: user.birthState,
          birth_city: user.birthCity,
          password: hashedPassword,
        },
      });

      await tx.birthChart.create({
        data: {
          userId: createdUser.id,
          sun: zodiacs.sunSign.name,
          moon: zodiacs.moonSign.name,
        },
      });
    });
  } catch (e) {
    throw errorHandler(e);
  }
};

interface Credentials {
  email: string;
  password: string;
}

export const signin = async (credentials: Credentials) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email: credentials.email,
      },
    });

    if (!user) {
      throw new Error();
    }

    const passwordValid = await compareHash(
      credentials.password,
      user.password,
    );

    if (passwordValid) {
      const token = await issueJWT(user);
      console.log(token);
      return token;
    }
  } catch (e) {
    throw errorHandler(e);
  }
};

export const verify = async (credential: string) => {
  try {
    const found = await db.user.findFirst({
      where: {
        email: credential,
      },
    });

    if (found) return { status: true };
    return { status: false };
  } catch (e) {
    throw errorHandler(e);
  }
};
