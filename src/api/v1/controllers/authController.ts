import { Request, Response, NextFunction } from "express";

import {
  signup as signupService,
  signin as signinService
} from "../services/authService";

export const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.body;
    const newUser = await signupService(user);
    res.send(newUser);
  } catch(e) {
    next(e);
  };
};

export const signin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const credentials = req.body;
    const token = await signinService(credentials);
    res.json(token);
  } catch(e) {
    next(e)
  };
};
