import firebase from "firebase";
import * as firebaseui from "firebaseui";
import React, { useEffect } from "react";

const config: any = {
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  signInSuccessUrl: "/login"
};

let ui: any;

function Login() {
  useEffect(() => {
    if (!ui) {
      ui = new firebaseui.auth.AuthUI(firebase.auth());
    }

    ui.start("#auth-login", config);
  }, []);

  return <div id="auth-login"></div>;
}

export { Login };
