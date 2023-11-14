import { Request } from "express";
import jwt from "jsonwebtoken";
import { TokenDto } from "../dtos/token.dto";
import { SettingsConfig } from "../configs/settings.config";
import { BadRequestError, InternalServerError } from "../utils/error.util";

export class TokenHelper {
  static getTokenFromRequest(req: Request): string | undefined {
    try {
      const token =
        (req.headers.authorization &&
          req.headers.authorization.split(" ")[1]) ||
        req.headers["x-access-token"] ||
        req.query.token ||
        req.body.token;
      if (!token) throw new BadRequestError("Invalid token");
      return token;
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new InternalServerError(errorMessage);
    }
  }

  static getTokenDtoFromRequest(req: Request): TokenDto | undefined {
    try {
      const token = this.getTokenFromRequest(req);
      if (!token) throw new BadRequestError("Invalid token");
      return this.getTokenDto(token);
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new InternalServerError(errorMessage);
    }
  }

  static getTokenDto(token: string): TokenDto | undefined {
    try {
      const tokenKey = SettingsConfig.getTokenKey();
      const tokenDto = jwt.verify(token, tokenKey);
      if (!tokenDto) throw new BadRequestError("Invalid token");
      return tokenDto as TokenDto;
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new InternalServerError(errorMessage);
    }
  }
}
