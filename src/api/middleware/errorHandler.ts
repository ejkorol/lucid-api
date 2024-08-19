import { Request, Response, NextFunction } from "express";
import { ApiError } from "@/utils/errors";

/**
 * Middleware for handling errors.
 * 
 * @param {Error} err - The error object.
 * @param {Request} _req - The request object (not used).
 * @param {Response} res - The response object.
 * @param {NextFunction} _next - The next middleware function (not used).
 */

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      error: err.name,
      message: err.message,
    });
  }

  return res.status(500).json({
    error: 'InternalServerError',
    message: 'An unexpected error occurred',
  });
};
