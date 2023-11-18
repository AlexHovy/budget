import { Request, Response, NextFunction } from "express";
import { BaseError, InternalServerError } from "../utils/error.util";
import { logService } from "../configs/di.config";

export const errorMiddleware = async (
  err: BaseError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await logService.error(err);

  if (err instanceof BaseError) {
    res.status(err.httpCode).json({ error: err.name, message: err.message });
  } else {
    const unknownError = new InternalServerError();
    res
      .status(unknownError.httpCode)
      .json({ error: unknownError.name, message: unknownError.message });
  }
};
