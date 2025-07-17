import type { Request, Response, NextFunction, RequestHandler } from "express";

/**
 * Wraps an async controller to automatically catch errors and forward them to next().
 * Avoids unhandled promise rejections and satisfies strict lint rules.
 */
export function asyncHandler<Req extends Request = Request, Res extends Response = Response>(
  fn: (req: Req, res: Res, next: NextFunction) => Promise<unknown>
): RequestHandler {
  return (req, res, next) => {
    void fn(req as Req, res as Res, next).catch(next);
  };
}
