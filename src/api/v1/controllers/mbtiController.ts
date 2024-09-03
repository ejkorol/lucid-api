import { NextFunction, Request, Response } from "express";

import {
  getPersonalities as getPersonalitiesService
} from "../services/mbtiService";

export const getPersonalities = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await getPersonalitiesService();
    res.json(data);
  } catch(e) {
    next(e);
  };
};
