import { SettingNames } from "../constants/setting-names";

export class SettingsConfig {
  static getBaseUrl(): string {
    return this.getEnvironmentVariable(SettingNames.BASE_URL);
  }

  private static getEnvironmentVariable(key: string): string {
    const value = process.env[key];
    if (!value) {
      throw new Error(`Environment variable ${key} is not set.`);
    }

    return value;
  }
}
