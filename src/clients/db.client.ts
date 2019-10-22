import firebase from "firebase";

import { DEV, FIREBASE_CONFIG } from "../constants/env.constant";

const ENV = DEV ? "dev" : "prod";

try {
  firebase.app();
} catch {
  firebase.initializeApp(FIREBASE_CONFIG);
}

const firestore = firebase.firestore();

const db = firestore.collection("env").doc(ENV);

export { db };
