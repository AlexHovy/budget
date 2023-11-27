import { Request } from "express";
import { TokenDto } from "../dtos/token.dto";
import { InternalServerError, UnauthorizedError } from "../utils/error.util";
import { cahceService } from "../configs/dependency.config";
import { CacheKeys } from "../constants/cache-keys";
import * as admin from "firebase-admin";

export class TokenHelper {
  static getTokenFromRequest(req: Request): string {
    try {
      const token =
        req.headers.authorization?.split("Bearer ")[1] ||
        req.headers["x-access-token"] ||
        req.query.token ||
        req.body.token;
      if (!token) throw new UnauthorizedError();
      return token;
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new InternalServerError(errorMessage);
    }
  }

  static getTokenDto(): TokenDto {
    try {
      const tokenDto = cahceService.get<TokenDto>(CacheKeys.TOKEN_DTO);
      if (!tokenDto) throw new UnauthorizedError();

      return tokenDto;
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new InternalServerError(errorMessage);
    }
  }

  static async verifyToken(req: Request): Promise<void> {
    try {
      const token = this.getTokenFromRequest(req);
      if (!token) throw new UnauthorizedError();

      const decodedToken = await admin.auth().verifyIdToken(token);
      const tokenDto: TokenDto = {
        userId: decodedToken.uid,
        name: decodedToken.name,
        email: decodedToken.email,
      };
      await cahceService.set<TokenDto>(CacheKeys.TOKEN_DTO, tokenDto);
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new InternalServerError(errorMessage);
    }
  }
}
