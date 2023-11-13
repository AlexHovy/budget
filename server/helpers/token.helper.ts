import { Request } from "express";
import jwt from "jsonwebtoken";
import { TokenDto } from "../dtos/token.dto";

const { TOKEN_KEY } = process.env;

export class TokenHelper {
  static getTokenFromRequest(req: Request): string {
    return (
      (req.headers.authorization && req.headers.authorization.split(" ")[1]) ||
      req.headers["x-access-token"] ||
      req.query.token ||
      req.body.token
    );
  }

  static getTokenDtoFromRequest(req: Request): TokenDto | undefined {
    const token = this.getTokenFromRequest(req);
    return this.getTokenDto(token);
  }

  static getTokenDto(token: string): TokenDto | undefined {
    let tokenDto;
    try {
      if (TOKEN_KEY) {
        tokenDto = jwt.verify(token, TOKEN_KEY) as TokenDto;
      }
    } catch (err) {
      throw new Error("Invalid token");
    }
    return tokenDto;
  }
}
