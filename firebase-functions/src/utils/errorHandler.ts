import { NextFunction, Request, Response } from "express";
import AppError from "./AppError";
import { sendError } from "./apiResponse.utils";

/**
 * Centralized error-handling middleware.
 * Sends JSON responses in a consistent structure.
 */
export function errorHandler(
  err: Error | AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  // If it's not an AppError, wrap it
  const error = err instanceof AppError ? err : new AppError("Internal server error", 500);

  const { statusCode, message } = error;

  sendError(res, message, statusCode);
}
