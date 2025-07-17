import { Router } from "express";
import * as controller from "../controllers/visitsTraffic.controller";
// import { authMiddleware, editorOnly } from "../middlewares/auth.middleware";
import { asyncHandler } from "../utils/asyncHandler";
// import { validateBody } from "../middlewares/validation.middleware";
// import { createUserSchema, updateUserSchema } from "../types/user.types";

const visitsTrafficRouter = Router();

// Protected: all routes require a valid token
// visitsTrafficRouter.use(authMiddleware);

// GET /visits-traffic?limit=10&page=1
visitsTrafficRouter.get("/", asyncHandler(controller.fetchVisitsTrafficController));

// POST /visits-traffic
// visitsTrafficRouter.post(
// "/",
// editorOnly,
//   asyncHandler(controller.createVisitsTrafficController)
// );

// PUT /visits-traffic/:id
// visitsTrafficRouter.put(
//   "/:id",
//   // editorOnly,
//   //   validateBody(updateUserSchema),
//   asyncHandler(controller.updateVisitsTrafficController)
// );

// DELETE /visits-traffic/:id
// visitsTrafficRouter.delete(
//   "/:id",
//   // editorOnly,
//   asyncHandler(controller.deleteVisitsTrafficController)
// );

export default visitsTrafficRouter;
