import { BaseError } from "../utils/error.util";

export class LogService {
  async error(error: BaseError): Promise<void> {
    console.log(error);
  }
}
