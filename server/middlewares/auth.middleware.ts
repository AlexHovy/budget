import { Request, Response, NextFunction } from "express";
import { TokenHelper } from "../helpers/token.helper";

export class AuthMiddleware {
  static verifyToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Response | void {
    const token = TokenHelper.getTokenFromRequest(req);
    if (!token) {
      return res
        .status(403)
        .json({ error: "A token is required for authentication" });
    }

    try {
      const tokenDto = TokenHelper.getTokenDto(token);
      if (!tokenDto) throw new Error("Invalid token");
    } catch (err) {
      return res.status(401).json({ error: "Invalid token" });
    }

    return next();
  }
}
