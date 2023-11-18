import ua, { EventParams, ExceptionParams, Visitor } from "universal-analytics";
import { queue } from "../configs/di.config";
import { LogEventDto } from "../dtos/log.dto";
import { LogErrorHandler } from "../handlers/logs/log-error.handler";
import { LogEventHandler } from "../handlers/logs/log-event.handler";
import { BaseError } from "../utils/error.util";
import { SettingsConfig } from "../configs/settings.config";
import { TokenHelper } from "../helpers/token.helper";

export class LogService {
  private _trackerId: string = SettingsConfig.getGATrackingId();

  private _visitor: Visitor = ua(this._trackerId);
  public get getVisitor(): Visitor | null {
    return this._visitor;
  }

  public set setVisitor(userId: string) {
    this._visitor = ua(this._trackerId, userId);
  }

  constructor() {
    queue.setHandler(new LogErrorHandler());
    queue.setHandler(new LogEventHandler());
  }

  async error(error: BaseError): Promise<void> {
    const params: ExceptionParams = {
      exd: error.description,
      exf: error.isOperational,
    };
    await queue.enqueue(params);
  }

  async event(event: LogEventDto): Promise<void> {
    const params: EventParams = {
      ec: event.category,
      ea: event.action,
      el: event.label,
      ev: event.event,
      p: event.page,
    };
    await queue.enqueue(params);
  }
}
