import { Request, Response, NextFunction } from "express";
import { BaseError, InternalServerError } from "../utils/error.util";
import { queue } from "../configs/dependency.config";
import { LogErrorHandler } from "../handlers/logs/log-error.handler";

export class ErrorMiddleware {
  constructor() {
    queue.setHandler(new LogErrorHandler());
  }

  async handle(
    err: BaseError,
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    await queue.enqueue(err);

    if (err instanceof BaseError) {
      res.status(err.httpCode).json({ error: err.name, message: err.message });
    } else {
      const unknownError = new InternalServerError();
      res
        .status(unknownError.httpCode)
        .json({ error: unknownError.name, message: unknownError.message });
    }
  }
}
