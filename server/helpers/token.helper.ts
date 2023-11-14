import { Request } from "express";
import jwt from "jsonwebtoken";
import { TokenDto } from "../dtos/token.dto";
import { SettingsConfig } from "../configs/settings.config";

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
      const tokenKey = SettingsConfig.getTokenKey();
      if (tokenKey) {
        tokenDto = jwt.verify(token, tokenKey) as TokenDto;
      }
    } catch (err) {
      throw new Error("Invalid token");
    }
    return tokenDto;
  }
}
