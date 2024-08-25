import db from "@/utils/db";
import { Request, Response, NextFunction } from "express";
import { verifyJWT } from "@/utils/auth";
import { AuthorizationError } from "@/utils/errors";

export const authHandler = async (
  req: Request,
  _res: Response,
  next: NextFunction) => {
  try {
    const token = req.cookies['token'];

    if (!token) throw new AuthorizationError();

    const decryptedToken = await verifyJWT(token);

    if (!decryptedToken) throw new AuthorizationError();

    const user = await db.user.findUnique({
      where: {
        email: decryptedToken.email as string
      }
    })

    if (!user) throw new AuthorizationError();

    console.log(decryptedToken);
    console.log(user);

    next();
  } catch(e) {
    throw e;
  };
};
