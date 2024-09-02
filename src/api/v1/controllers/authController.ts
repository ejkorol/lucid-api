import { Request, Response, NextFunction } from "express";

import {
  signup as signupService,
  signin as signinService,
  verify as verifyService
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
    next(e);
  };
};

export const verify = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const credential = req.params.credential;
    const status = await verifyService(credential);
    res.json(status);
  } catch(e) {
    next(e);
  };
};
