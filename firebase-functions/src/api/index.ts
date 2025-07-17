import { Router } from "express";
import visitsTrafficRouter from "../routes/visitsTraffic.router";

const api = Router();

api.use("/visits-traffic", visitsTrafficRouter);

export default api;
