import { NextFunction, Request, Response } from "express";
import { HttpStatusCode } from "../constants/http-status-codes";

export class HealthController {
  async get(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      return res.sendStatus(HttpStatusCode.OK);
    } catch (error) {
      return next(error);
    }
  }
}
