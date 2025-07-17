// firebase-functions/src/utils/apiResponse.utils.ts

import type { Response } from "express";
import { PaginatedResponse } from "../types/pagination.types";

/**
 * Standard API response structure.
 * @template T - Type of the data payload
 */
export interface ApiResponse<T> {
  success: true; // always true for success responses
  data?: T;
  message?: string;
  meta?: Record<string, unknown>;
}
export interface SafeResponse<T> {
  status: (code: number) => {
    json: (body: T) => void;
  };
}

/**
 * Sends a generic success response with data.
 * @param res - Express Response object, with body typed as ApiResponse<T>
 * @param data - Payload to send
 * @param message - Optional human-readable message
 * @param statusCode - HTTP status code (default 200)
 */
export function sendSuccess<T>(
  res: SafeResponse<ApiResponse<T>>,
  data: T,
  message?: string,
  statusCode: number = 200
) {
  const payload: ApiResponse<T> = { success: true, data };
  if (message) payload.message = message;
  return res.status(statusCode).json(payload);
}
/**
 * Sends an error response with a message and optional status code.
 * @param res - Express Response object
 * @param error - Error message to send
 * @param statusCode - HTTP status code (default 500)
 */
export function sendError(res: Response, error: string, statusCode = 500): Response {
  const payload = {
    success: false,
    error,
    ...(process.env.NODE_ENV === "development" && { stack: new Error().stack }),
  };
  return res.status(statusCode).json(payload);
}

/**
 * Sends a 201 Created response with data.
 * @param res - Express Response object, with body typed as ApiResponse<T>
 * @param data - Payload to send
 * @param message - Optional message
 */
export function sendCreated<T>(res: Response, data: T, message?: string) {
  return sendSuccess(res, data, message, 201);
}

/**
 * Sends a paginated response.
 * @param res - Express Response object, with body typed as PaginatedResponse<T>
 * @param items - Array of items for the current page
 * @param total - Total number of items across all pages
 * @param page - Current page number
 * @param limit - Number of items per page
 */
export function sendPaginated<T>(
  res: Response<PaginatedResponse<T>>,
  items: T[],
  total: number,
  page: number,
  limit: number
): Response<PaginatedResponse<T>> {
  const pages = Math.ceil(total / limit);
  const payload: PaginatedResponse<T> = {
    success: true,
    data: items,
    meta: { total, page, limit, pages },
  };
  return res.json(payload);
}
