import { NextFunction, Request, Response } from "express";
import { HttpStatusCode } from "../constants/http-status-codes";

export class HealthCheckController {
  async get(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      return res.status(HttpStatusCode.OK);
    } catch (error) {
      return next(error);
    }
  }
}
