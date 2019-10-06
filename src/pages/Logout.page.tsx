import firebase from "firebase";
import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";

import { logger } from "../clients/logger.client";

interface Props {
  user?: firebase.User;
  setUser(user?: firebase.User): void;
}

function Logout({ setUser, user }: Props) {
  useEffect(() => {
    firebase
      .auth()
      .signOut()
      .catch(logger.error);
    setUser();
  }, []);

  return user ? <div>Logout</div> : <Redirect to="/" />;
}

export { Logout };
