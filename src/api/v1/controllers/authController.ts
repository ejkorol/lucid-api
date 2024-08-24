import { Request, Response, NextFunction } from "express";

import {
  signup as signupService
} from "../services/authService";

export const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.body;
    const newUser = await signupService(user);
    res.send(newUser);
  } catch (e) {
    next(e);
  };
};
