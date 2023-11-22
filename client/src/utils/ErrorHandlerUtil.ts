import { notificationEmitter } from "../config/EventsConfig";
import { EventTypes } from "../constants/EventTypes";

export const handleError = (error: any) => {
  // TODO: log errors with service insights
  console.error(error);

  notificationEmitter.emit(EventTypes.NOTIFICATION_ERROR, error.message);
};
