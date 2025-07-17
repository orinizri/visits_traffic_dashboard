import type { Request, Response, NextFunction } from "express";
import type { ListQuery } from "../types/pagination.types";
import * as service from "../services/visitsTraffic.service";
import { sendPaginated, sendSuccess, sendCreated, ApiResponse } from "../utils/apiResponse.utils";
import { TrafficSeedInput } from "../types/visitsTraffic.types";
import { CreateVisitsTrafficDTO, VisitsTrafficSchema } from "../zod/visitsTraffic.schema";
import { ParamsDictionary } from "express-serve-static-core";
import { logger } from "firebase-functions";

export async function fetchVisitsTrafficController(
  req: Request<ParamsDictionary, ApiResponse<TrafficSeedInput[]>, unknown, ListQuery>,
  res: Response<ApiResponse<TrafficSeedInput[]>>,
  next: NextFunction
) {
  try {
    const limit = Number(req.query.limit) || 10;
    const page = Number(req.query.page) || 1;
    const { items, total } = await service.fetchVisitsStats({ limit, page });
    logger.log("Fetched visits traffic:", items, "Total:", total);
    sendPaginated(res, items, total, page, limit);
  } catch (err) {
    logger.log("Error fetching visits traffic:", err);
    next(err);
  }
}

/**
 * POST /users
 * Creates a new user. Requires editor role.
 */
export async function createVisitsTrafficController(
  req: Request<
    ParamsDictionary,
    { success: boolean; data: TrafficSeedInput },
    CreateVisitsTrafficDTO
  >,
  res: Response<{ success: boolean; data: TrafficSeedInput }>,
  next: NextFunction
) {
  try {
    const parsed = VisitsTrafficSchema.parse(req.body);
    const newUser = await service.createVisitsTraffic(parsed);
    sendCreated(res, newUser, "User created successfully");
  } catch (err) {
    next(err);
  }
}

/**
 * PUT /users/:id
 * Updates an existing user. Requires editor role.
 */
export async function updateVisitsTrafficController(
  req: Request<ParamsDictionary>,
  res: Response,
  next: NextFunction
) {
  try {
    const parsed = VisitsTrafficSchema.parse(req.body);
    const updatedUser = await service.updateVisitsTraffic(parsed);
    sendSuccess(res, updatedUser, "User updated successfully");
  } catch (err) {
    next(err);
  }
}

/**
 * DELETE /users/:id
 * Deletes a user by ID. Requires editor role.
 */
export async function deleteVisitsTrafficController(
  req: Request<{ date: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    // TODO: zod validate req.params.date
    await service.deleteVisitsTraffic(req.params.date);
    sendSuccess(res, undefined, "User deleted successfully");
  } catch (err) {
    next(err);
  }
}
