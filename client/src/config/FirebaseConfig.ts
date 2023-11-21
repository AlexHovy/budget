import { initializeApp } from "firebase/app";
import {
  browserLocalPersistence,
  getAuth,
  setPersistence,
} from "firebase/auth";
import { SettingsConfig } from "./SettingsConfig";

class FirebaseConfig {
  static connect() {
    const firebaseConfig = {
      apiKey: SettingsConfig.getFirebaseApiKey(),
      authDomain: SettingsConfig.getFirebaseAuthDomain(),
      projectId: SettingsConfig.getFirebaseProjectId(),
      storageBucket: SettingsConfig.getFirebaseStorageBucket(),
      messagingSenderId: SettingsConfig.getFirebaseMessagingSenderId(),
      appId: SettingsConfig.getFirebaseAppId(),
      measurementId: SettingsConfig.getFirebaseMeasurementId(),
    };

    initializeApp(firebaseConfig);

    const auth = getAuth();
    setPersistence(auth, browserLocalPersistence);
  }
}

export default FirebaseConfig;
