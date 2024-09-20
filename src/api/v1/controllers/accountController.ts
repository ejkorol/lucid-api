import { Request, Response, NextFunction } from "express";
import {
  deleteAccount as deleteAccountService,
  updateAccount as updateAccountService
} from "../services/accountService";

export const deleteAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {
    const userToken = req.cookies.token;
    const { password } = req.body;

    const action = await deleteAccountService(password, userToken);

    res.json(action);
  } catch(e) {
    next(e);
  };
};

export const updateAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {
    const userToken = req.cookies.token;
    const data = req.body;
    const updatedAccount = await updateAccountService(data, userToken);
    res.json(updatedAccount);
  } catch(e) {
    next(e);
  };
};
