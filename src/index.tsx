import firebase from "firebase";
import React from "react";
import ReactDOM from "react-dom";

import { App } from "./App";
import { firebaseConfig } from "./constants/env.constant";

firebase.initializeApp(firebaseConfig);

const domContainer = document.querySelector("#app");

ReactDOM.render(<App />, domContainer);
