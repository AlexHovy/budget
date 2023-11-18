import { InternalServerError } from "../../utils/error.util";
import { IBaseHandler } from "../bases/base.handler";
import { logService } from "../../configs/di.config";
import { LogErrorDto } from "../../dtos/log.dto";
import { ExceptionParams } from "universal-analytics";

export class LogErrorHandler implements IBaseHandler<ExceptionParams> {
  async handle(params: ExceptionParams): Promise<void> {
    try {
      const visitor = logService.getVisitor;
      if (!visitor) throw new InternalServerError("Analytics not configured");

      visitor.exception(params).send();
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new InternalServerError(errorMessage);
    }
  }
}
