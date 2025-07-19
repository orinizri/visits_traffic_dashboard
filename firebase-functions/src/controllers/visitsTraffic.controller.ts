import type { Request, Response, NextFunction } from "express";
import type { ListQuery } from "../types/pagination.types";
import * as service from "../services/visitsTraffic.service";
import { sendPaginated, sendSuccess, sendCreated, ApiResponse } from "../utils/apiResponse.utils";
import { TrafficSeedEntry } from "../types/visitsTraffic.types";
import { CreateVisitsTrafficDTO, VisitsTrafficSchema } from "../zod/visitsTraffic.schema";
import { ParamsDictionary } from "express-serve-static-core";
import { logger } from "firebase-functions";

export async function fetchVisitsTrafficController(
  req: Request<ParamsDictionary, ApiResponse<TrafficSeedEntry[]>, unknown, ListQuery>,
  res: Response<ApiResponse<TrafficSeedEntry[]>>,
  next: NextFunction
) {
  try {
    const limit = Number(req.query.limit) || 100;
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
 * POST /visits-traffic
 * Creates a new user. Requires editor role.
 */
export async function createVisitsTrafficController(
  req: Request<
    ParamsDictionary,
    { success: boolean; data: TrafficSeedEntry },
    CreateVisitsTrafficDTO
  >,
  res: Response<{ success: boolean; data: TrafficSeedEntry }>,
  next: NextFunction
) {
  try {
    const parsed = VisitsTrafficSchema.parse(req.body);
    const newUser = await service.createVisitsTraffic(parsed);
    sendCreated(res, newUser, "Entry created successfully");
  } catch (err) {
    next(err);
  }
}

/**
 * PUT /visits-traffic
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
    sendSuccess(res, updatedUser, "Entry updated successfully");
  } catch (err) {
    next(err);
  }
}

/**
 * DELETE /visits-traffic
 * Deletes a user by ID. Requires editor role.
 */
export async function deleteVisitsTrafficController(
  req: Request<ParamsDictionary, { success: boolean; data: TrafficSeedEntry }, { date: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    // TODO: zod validate req.params.date
    await service.deleteVisitsTraffic(req.body.date);
    sendSuccess(res, undefined, "Entry deleted successfully");
  } catch (err) {
    next(err);
  }
}
