import firebase from "firebase";

import { DEV, FIREBASE_CONFIG } from "../constants/env.constant";
import { logger } from "./logger.client";

const ENV = DEV ? "dev" : "prod";

try {
  firebase.app();
} catch {
  logger.debug("Initializing firebase app");

  firebase.initializeApp(FIREBASE_CONFIG);
}

const firestore = firebase.firestore();

const db = firestore.collection("env").doc(ENV);

export { db };
