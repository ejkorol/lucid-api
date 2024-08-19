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

export class NotFoundError extends ApiError {
  constructor(message: string = "Not Found") {
    super(message, 404);
    this.name = "Not Found";
  };
};

export class UnknownError extends ApiError {
  constructor(message: string = "Unknown Error") {
    super(message, 500);
    this.name = "Unknown Error";
  };
};

export function errorHandler(e: unknown) {
  if (e instanceof ApiError) {
    return e
  };

  if (e instanceof Error) {
    return new UnknownError(`An unexpected error occured: \n ${e}`);
  };

  return new UnknownError();
};
