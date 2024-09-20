import bcrypt from "bcrypt";
import * as jose from "jose";
import { User } from "@prisma/client";

const saltRounds = 10;
const secret = new TextEncoder().encode(process.env.JWT_SECRET);

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET has not been configured");
};

// Hash Function
export const hashPassword = async (password: string): Promise<string> => {
  try {
    const salt = await new Promise<string>((resolve, reject) => {
      bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) {
          reject(err);
        } else {
          resolve(salt);
        };
      });
    });

    return await new Promise<string>((resolve, reject) => {
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          reject(err);
        } else {
          resolve(hash);
        };
      });
    });
  } catch (e) {
    console.error(e);
    throw e;
  };
};

// Compare Hashes
export const compareHash = async (password: string, hash: string): Promise<boolean> => {
  try {
    return await new Promise<boolean>((resolve, reject) => {
      bcrypt.compare(password, hash, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        };
      });
    });
  } catch (e) {
    console.error(e);
    throw e;
  };
};

// Issue JWT
export const issueJWT = async (user: User): Promise<string> => {
  try {
    const token = await new jose.SignJWT({
      userId: user.id,
      email: user.email,
      user: user.first_name
    })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("720h")
    .sign(secret);

    return token;
  } catch(e) {
    console.error(e);
    throw e;
  };
};

// Verify JWT
export const verifyJWT = async (token: string) => {
  try {
    if (!token) return;
    const { payload } = await jose.jwtVerify(token, secret);
    return payload;
  } catch(e) {
    console.error(e);
    throw e;
  };
};

export interface UserToken {
  userId: string;
  email: string;
  user: string;
};
