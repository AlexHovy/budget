import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const { TOKEN_KEY } = process.env;

export class AuthMiddleware {
  static verifyToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Response | void {
    const token =
      (req.headers.authorization && req.headers.authorization.split(" ")[1]) ||
      req.headers["x-access-token"] ||
      req.query.token ||
      req.body.token;

    if (!token) {
      return res
        .status(403)
        .json({ error: "A token is required for authentication" });
    }

    try {
      if (TOKEN_KEY) {
        const decoded = jwt.verify(token, TOKEN_KEY);
        (req as any).user = decoded;
      } else {
        throw new Error(
          "TOKEN_KEY is not defined in your environment variables"
        );
      }
    } catch (err) {
      return res.status(401).json({ error: "Invalid token" });
    }

    return next();
  }
}
