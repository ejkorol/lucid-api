import { ZodError } from "zod";

/*
 * Custom error classes for API error handling.
 * 
 * This module defines custom error types to standardize error responses
 * in the API.
 */

export class ApiError extends Error {
  public statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = "Api Error";
  };
};

// 404 Error
export class NotFoundError extends ApiError {
  constructor(message: string = "Not Found") {
    super(message, 404);
    this.name = "Not Found";
  };
};

// Unknown Error
export class UnknownError extends ApiError {
  constructor(message: string = "Unknown Error") {
    super(message, 500);
    this.name = "Unknown Error";
  };
};

export class ValidationError extends ApiError {
  constructor(message: string = "Validation Error") {
    super(message, 400);
    this.name = "Validation Error";
  };
};

/* ********************************************** */
/*                  Error Handler                 */
/* ********************************************** */
export function errorHandler(e: unknown) {
  if (e instanceof ApiError) {
    return e
  };

  if (e instanceof ZodError) {
    console.error(e);
    return new ValidationError(`Check logs for details`);
  };

  if (e instanceof Error) {
    return new UnknownError(`An unexpected error occured: \n ${e}`);
  };

  return new UnknownError();
};
