import { initializeApp } from "firebase/app";

class FirebaseConfig {
  constructor() {
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
  }
}

export default FirebaseConfig;
