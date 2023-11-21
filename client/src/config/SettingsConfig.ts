import { SettingNames } from "../constants/SettingNames";

export class SettingsConfig {
  static getBaseUrl(): string {
    return this.getEnvironmentVariable(SettingNames.BASE_URL);
  }
  
  static getFirebaseApiKey(): string {
    return this.getEnvironmentVariable(SettingNames.FIREBASE_API_KEY);
  }
  
  static getFirebaseAuthDomain(): string {
    return this.getEnvironmentVariable(SettingNames.FIREBASE_AUTH_DOMAIN);
  }
  
  static getFirebaseProjectId(): string {
    return this.getEnvironmentVariable(SettingNames.FIREBASE_PROJECT_ID);
  }
  
  static getFirebaseStorageBucket(): string {
    return this.getEnvironmentVariable(SettingNames.FIREBASE_STORAGE_BUCKET);
  }
  
  static getFirebaseMessagingSenderId(): string {
    return this.getEnvironmentVariable(SettingNames.FIREBASE_MESSAGING_SENDER_ID);
  }
  
  static getFirebaseAppId(): string {
    return this.getEnvironmentVariable(SettingNames.FIREBASE_APP_ID);
  }
  
  static getFirebaseMeasurementId(): string {
    return this.getEnvironmentVariable(SettingNames.FIREBASE_MEASUREMENT_ID);
  }

  private static getEnvironmentVariable(key: string): string {
    const value = process.env[key];
    if (!value) {
      throw new Error(`Environment variable ${key} is not set.`);
    }

    return value;
  }
}
