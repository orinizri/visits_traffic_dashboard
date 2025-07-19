import { Router } from "express";
import * as controller from "../controllers/visitsTraffic.controller";
import { asyncHandler } from "../utils/asyncHandler";
import { authMiddleware } from "../middlewares/auth.middleware";

const visitsTrafficRouter = Router();

// Protected: all routes require a valid token
visitsTrafficRouter.use(authMiddleware);

// GET /visits-traffic?limit=10&page=1
visitsTrafficRouter.get("/", asyncHandler(controller.fetchVisitsTrafficController));

// POST /visits-traffic
visitsTrafficRouter.post("/", asyncHandler(controller.createVisitsTrafficController));

// PUT /visits-traffic/
visitsTrafficRouter.put("/", asyncHandler(controller.updateVisitsTrafficController));

// DELETE /visits-traffic/:id
visitsTrafficRouter.post("/delete", asyncHandler(controller.deleteVisitsTrafficController));

export default visitsTrafficRouter;
