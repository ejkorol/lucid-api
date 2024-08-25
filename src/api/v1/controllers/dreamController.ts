import { Request, Response, NextFunction } from "express";
import {

} from "@/api/v1/services/dreamService";

export const postDream = async (
  req: Request,
  res: Response,
  next: NextFunction) => {
  try {

  } catch(e) {
    next(e);
  };
};
