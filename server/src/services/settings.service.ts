import { SettingNames } from "../constants/setting-names";
import { InternalServerError } from "../utils/error.util";
import { fileHelper, parameterStore } from "../configs/dependency.config";

export class SettingsService {
  private isLocal: boolean;

  constructor() {
    this.isLocal = process.env.NODE_ENV === "development";
  }

  async getRabbitMQUri(): Promise<string> {
    return this.getLocalEnvVar(SettingNames.RABBITMQ_URI);
  }

  async getDbUri(): Promise<string> {
    return this.getEnvVar(SettingNames.DB_URI);
  }

  async getDbName(): Promise<string> {
    return this.getLocalEnvVar(SettingNames.DB_NAME);
  }

  async getFirebaseServiceAccount(): Promise<string> {
    const content = this.isLocal
      ? await fileHelper.readFile("../../config/firebase-service-account.json")
      : await this.getLiveEnvVar(SettingNames.FIREBASE_SERVICE_ACCOUNT);
    const serviceAccount = JSON.parse(content);
    return serviceAccount;
  }

  private async getEnvVar(key: SettingNames): Promise<string> {
    return this.isLocal
      ? this.getLocalEnvVar(key)
      : await this.getLiveEnvVar(key);
  }

  private getLocalEnvVar(key: SettingNames): string {
    const value = process.env[key];
    if (!value)
      throw new InternalServerError(`Missing environment variable ${key}`);

    return value;
  }

  private async getLiveEnvVar(key: SettingNames): Promise<string> {
    const value = await parameterStore.getParameter(key);
    if (!value)
      throw new InternalServerError(`Missing stored parameter ${key}`);

    return value;
  }
}
