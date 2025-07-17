import { onRequest } from "firebase-functions/v2/https";
import { sendCreated, sendError } from "../utils/apiResponse.utils";
import { firestore } from "../config/firebaseAdmin";
import { logger } from "firebase-functions";
import { SEED_SECRET } from "../config/env";
import { trafficStatsSeedData } from "../data/trafficSeedData";
import { VisitsTrafficArraySchema } from "../zod/visitsTraffic.schema";
import z from "zod";
import { TrafficSeedBodySchema } from "../zod/visitsTraffic.schema";
/**
 * Seed trafficStats collection with predefined data.
 * This function is intended to be run once to populate initial data.
 * It requires a secret key to prevent unauthorized access.
 */
export const seedVisitsTrafficHandler = onRequest(async (req, res) => {
  try {
    const parsedSecret = TrafficSeedBodySchema.safeParse(req.body);
    if (!parsedSecret.success) {
      logger.warn("Invalid body", z.treeifyError(parsedSecret.error));
      sendError(res, "Invalid request body", 400);
      return;
    }
    const { secret } = parsedSecret.data;
    if (secret !== SEED_SECRET) {
      logger.warn("Unauthorized seed attempt", {
        ip: req.ip,
        time: new Date().toISOString(),
      });
      sendError(res, "Unauthorized access to seed trafficStats", 403);
      return;
    }
    const traffic = trafficStatsSeedData;
    const parsedVisitsTraffic = VisitsTrafficArraySchema.safeParse(traffic);
    if (!parsedVisitsTraffic.success) {
      logger.warn("Invalid seed data format", z.treeifyError(parsedVisitsTraffic.error));
      sendError(res, "Seed data is invalid", 400);
      return;
    }

    const batch = firestore.batch();
    const trafficRef = firestore.collection("trafficStats");

    for (const entry of parsedVisitsTraffic.data) {
      const { date, visits } = entry;
      const docRef = trafficRef.doc(date);
      // This will overwrite existing doc with same ID (to avoid creating multiple docs for the same day)
      batch.set(docRef, {
        date,
        visits,
        createdAt: new Date().toISOString(),
        createdBy: "seed",
      });
    }

    await batch.commit();
    sendCreated(
      res,
      { message: `${traffic.length} entries seeded.` },
      "trafficStats seeded successfully"
    );
  } catch (err) {
    logger.error("Seeding failed:", err);
    sendError(res, "Failed to seed trafficStats", 500);
  }
});
