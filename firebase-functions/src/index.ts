// functions/src/index.ts

import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";
import apiRouter from "./api";
import { errorHandler } from "./utils/errorHandler";
// import { seedVisitsTrafficHandler } from "./services/seedVisitsTraffic.service";

const app = express();

/* CORS */
app.use(cors({ origin: true }));

/* JSON PARSING */
app.use(express.json());

/* ROUTES */
app.use(apiRouter);

/* GLOBAL ERROR HANDLER */
app.use(errorHandler);

// ✅ Main Express API
export const api = functions.https.onRequest(app);

/* INITIAL TRAFFIC STATS SEEDER */
// export const seed = functions.https.onRequest(seedVisitsTrafficHandler);
