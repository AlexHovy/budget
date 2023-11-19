import { SettingNames } from "../constants/setting-names";
import { InternalServerError } from "../utils/error.util";

export class SettingsConfig {
  static getPort(): number {
    const port = this.getEnvironmentVariable(SettingNames.PORT);
    return parseInt(port);
  }

  static getRabbitMQUri(): string {
    return this.getEnvironmentVariable(SettingNames.RABBITMQ_URI);
  }

  static getDbUri(): string {
    return this.getEnvironmentVariable(SettingNames.DB_URI);
  }

  static getDbName(): string {
    return this.getEnvironmentVariable(SettingNames.DB_NAME);
  }

  private static getEnvironmentVariable(key: string): string {
    const value = process.env[key];
    if (!value)
      throw new InternalServerError(`Missing environment variable ${key}`);

    return value;
  }
}
