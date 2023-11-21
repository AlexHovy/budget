import { initializeApp } from "firebase/app";
import {
  browserLocalPersistence,
  getAuth,
  setPersistence,
} from "firebase/auth";

class FirebaseConfig {
  static connect() {
    const firebaseConfig = {
      apiKey: "AIzaSyCxhXyhROAqVJsB1B2CHDzaQ40T5goTIVQ",
      authDomain: "budget-6c4bb.firebaseapp.com",
      projectId: "budget-6c4bb",
      storageBucket: "budget-6c4bb.appspot.com",
      messagingSenderId: "934035370716",
      appId: "1:934035370716:web:df7b78b4bff226eabbba19",
      measurementId: "G-YNF6TSPBTP",
    };

    initializeApp(firebaseConfig);

    const auth = getAuth();
    setPersistence(auth, browserLocalPersistence);
  }
}

export default FirebaseConfig;
