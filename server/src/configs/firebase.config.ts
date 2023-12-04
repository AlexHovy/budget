import { InternalServerError } from "../utils/error.util";
import * as admin from "firebase-admin";
import { settingsService } from "./dependency.config";

export class FirebaseConfig {
  async connect() {
    try {
      const serviceAccount = await settingsService.getFirebaseServiceAccount();
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new InternalServerError(errorMessage);
    }
  }

  async isHealthy(): Promise<boolean> {
    try {
      await admin.auth().listUsers(1);
      return true;
    } catch (error) {
      return false;
    }
  }
}
