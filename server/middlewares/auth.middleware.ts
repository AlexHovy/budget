import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { TokenHelper } from "../helpers/token.helper";

const { TOKEN_KEY } = process.env;

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
      if (TOKEN_KEY) {
        const tokenDto = TokenHelper.getTokenDto(token);
        if (!tokenDto) throw new Error("Invalid token");
      } else {
        throw new Error("Missing TOKEN_KEY environment variable");
      }
    } catch (err) {
      return res.status(401).json({ error: "Invalid token" });
    }

    return next();
  }
}
