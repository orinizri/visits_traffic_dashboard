import { Request, Response, NextFunction } from "express";
import * as admin from "firebase-admin";
import AppError from "../utils/AppError";
import { logger } from "firebase-functions";

// Extend Request to carry the decoded token
export interface AuthRequest extends Request {
  user: admin.auth.DecodedIdToken;
}

// Verifies the Firebase ID token
export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  (async (): Promise<void> => {
    try {
      const header = req.headers.authorization;
      if (!header?.startsWith("Bearer ")) {
        next(new AppError("Unauthorized", 401));
      }

      const idToken = header!.split("Bearer ")[1];
      const decoded = await admin.auth().verifyIdToken(idToken);
      (req as AuthRequest).user = decoded;
      next();
    } catch {
      next(new AppError("Unauthorized", 401));
    }
  })().catch((err: unknown) => {
    logger.error("Unhandled error in authMiddleware:", err);
    if (!res.headersSent) {
      next(err);
    }
  });
}

// Guards editor-only routes (based on email containing “admin”)
export function editorOnly(req: Request, res: Response, next: NextFunction) {
  const user = (req as AuthRequest).user;
  if (!user.email || !user.email.includes("admin")) {
    next(new AppError("Forbidden: insufficient privileges", 403));
  }
  next();
}
