import firebase from "firebase";
import React from "react";
import ReactDOM from "react-dom";

import { App } from "./App";
import { logger } from "./clients/logger.client";
import { FIREBASE_CONFIG } from "./constants/env.constant";

try {
  firebase.app();
} catch {
  logger.debug("Initializing firebase app");

  firebase.initializeApp(FIREBASE_CONFIG);
}

const domContainer = document.querySelector("#app");

ReactDOM.render(<App />, domContainer);
