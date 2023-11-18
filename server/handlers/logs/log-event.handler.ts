import { IBaseHandler } from "../bases/base.handler";
import { logService } from "../../configs/di.config";
import { InternalServerError } from "../../utils/error.util";
import { EventParams } from "universal-analytics";

export class LogEventHandler implements IBaseHandler<EventParams> {
  async handle(params: EventParams): Promise<void> {
    try {
      const visitor = logService.getVisitor;
      if (!visitor) throw new InternalServerError("Analytics not configured");

      visitor.event(params).send();
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new InternalServerError(errorMessage);
    }
  }
}
