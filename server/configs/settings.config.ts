import { SettingNames } from "../constants/setting-names";

export class SettingsConfig {
  static getPort(): number {
    const port = this.getEnvironmentVariable(SettingNames.PORT);
    return parseInt(port);
  }

  static getDbUri(): string {
    return this.getEnvironmentVariable(SettingNames.DB_URI);
  }

  static getDbName(): string {
    return this.getEnvironmentVariable(SettingNames.DB_NAME);
  }

  static getTokenKey(): string {
    return this.getEnvironmentVariable(SettingNames.TOKEN_KEY);
  }

  static getTokenExpiresIn(): string {
    return this.getEnvironmentVariable(SettingNames.TOKEN_EXPIRES_IN);
  }

  private static getEnvironmentVariable(key: string): string {
    const value = process.env[key];
    if (!value) {
      throw new Error(`Missing environment variable ${key}`);
    }

    return value;
  }
}
