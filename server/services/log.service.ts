import { queue } from "../configs/di.config";
import { LogHandler } from "../handlers/log.handler";
import { BaseError } from "../utils/error.util";

export class LogService {
  constructor() {
    queue.init(new LogHandler());
  }

  async log(error: BaseError): Promise<void> {
    await queue.enqueue(error);
  }
}
