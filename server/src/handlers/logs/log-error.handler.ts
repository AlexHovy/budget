import { BaseError, InternalServerError } from "../../utils/error.util";
import { IBaseHandler } from "../bases/base.handler";
import { logService } from "../../configs/dependency.config";

export class LogErrorHandler implements IBaseHandler<BaseError> {
  async handle(error: BaseError): Promise<void> {
    try {
      await logService.error(error);
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new InternalServerError(errorMessage);
    }
  }
}
