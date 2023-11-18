import { BaseError } from "../utils/error.util";
import { IBaseHandler } from "./bases/base.handler";

export class LogHandler implements IBaseHandler<BaseError> {
  async handle(error: BaseError): Promise<void> {
    // TODO: log errors to insights service
    console.log(error);
  }
}
