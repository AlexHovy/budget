import { NextFunction, Request, Response } from "express";
import { HttpStatusCode } from "../constants/http-status-codes";
import {
  databaseConfig,
  firebaseConfig,
  queue,
} from "../configs/dependency.config";

export class HealthController {
  async get(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const isQueueHealthy = await queue.isHealthy();
      if (!isQueueHealthy)
        return res.sendStatus(HttpStatusCode.INTERNAL_SERVER);

      const isDatabaseHealthy = databaseConfig.isHealthy();
      if (!isDatabaseHealthy)
        return res.sendStatus(HttpStatusCode.INTERNAL_SERVER);

      const isFirebaseHealthy = firebaseConfig.isHealthy();
      if (!isFirebaseHealthy)
        return res.sendStatus(HttpStatusCode.INTERNAL_SERVER);

      return res.sendStatus(HttpStatusCode.OK);
    } catch (error) {
      return next(error);
    }
  }
}
