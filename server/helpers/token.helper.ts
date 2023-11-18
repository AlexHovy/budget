import { Request } from "express";
import jwt from "jsonwebtoken";
import { TokenDto } from "../dtos/token.dto";
import { SettingsConfig } from "../configs/settings.config";
import { BadRequestError, InternalServerError } from "../utils/error.util";
import { cahceService, logService } from "../configs/di.config";
import { CacheKeys } from "../constants/cache-keys";

export class TokenHelper {
  static getTokenFromRequest(req: Request): string {
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

  static getTokenDtoFromRequest(req: Request): TokenDto {
    try {
      const token = this.getTokenFromRequest(req);
      if (!token) throw new BadRequestError("Invalid token");
      return this.getTokenDto(token);
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new InternalServerError(errorMessage);
    }
  }

  static getTokenDto(token: string): TokenDto {
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

  static getTokenDtoFromCache(): TokenDto | undefined {
    try {
      const tokenDto = cahceService.get<TokenDto>(CacheKeys.TOKEN_DTO);
      return tokenDto;
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new InternalServerError(errorMessage);
    }
  }

  static signToken(tokenDto: TokenDto): string | undefined {
    try {
      const tokenKey = SettingsConfig.getTokenKey();
      const tokenExpiresIn = SettingsConfig.getTokenExpiresIn();
      const token = jwt.sign(tokenDto, tokenKey, {
        expiresIn: tokenExpiresIn,
      });

      cahceService.set<TokenDto>(CacheKeys.TOKEN_DTO, tokenDto);
      // TODO: update log with token

      return token;
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new InternalServerError(errorMessage);
    }
  }
}
