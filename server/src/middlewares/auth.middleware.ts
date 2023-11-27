import { Request, Response, NextFunction } from "express";
import { TokenHelper } from "../helpers/token.helper";

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await TokenHelper.verifyToken(req);
    return next();
  } catch (error) {
    return next(error);
  }
};
