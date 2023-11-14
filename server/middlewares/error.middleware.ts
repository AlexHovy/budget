import { Request, Response, NextFunction } from "express";
import { BaseError, InternalServerError } from "../utils/error.util";

export const errorMiddleware = (
  err: BaseError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof BaseError) {
    res.status(err.httpCode).json({ error: err.name, message: err.message });
  } else {
    const unknownError = new InternalServerError();
    res
      .status(unknownError.httpCode)
      .json({ error: unknownError.name, message: unknownError.message });
  }
};
