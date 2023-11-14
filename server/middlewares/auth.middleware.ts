import { Request, Response, NextFunction } from "express";
import { TokenHelper } from "../helpers/token.helper";
import { BadRequestError, ForbiddenError } from "../utils/error.util";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = TokenHelper.getTokenFromRequest(req);
    if (!token) throw new ForbiddenError("Token is required");

    const tokenDto = TokenHelper.getTokenDto(token);
    if (!tokenDto) throw new BadRequestError("Invalid token");

    return next();
  } catch (error) {
    return next(error);
  }
};
