import { InternalServerError } from "../utils/error.util";
import * as admin from "firebase-admin";
import * as serviceAccount from "../data/serviceAccountKey.json";

export class FirebaseConfig {
  async connect() {
    try {
      admin.initializeApp({
        credential: admin.credential.cert(
          serviceAccount as admin.ServiceAccount
        ),
      });
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new InternalServerError(errorMessage);
    }
  }
}
