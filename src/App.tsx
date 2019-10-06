import firebase from "firebase";
import React, { useState } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

import { Conversation } from "./pages/Conversation.page";
import { Home } from "./pages/Home.page";
import { Login } from "./pages/Login.page";
import { Logout } from "./pages/Logout.page";

function App() {
  const [user, setUser] = useState<firebase.User>();

  firebase.auth().onAuthStateChanged(newUser => {
    if (newUser) {
      setUser(newUser);
    }
  });

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>

            {user ? (
              <li>
                <Link to="/conversation">Conversation</Link>
              </li>
            ) : null}

            <li>
              {user ? (
                <Link to="/logout">Logout</Link>
              ) : (
                <Link to="/login">Login</Link>
              )}
            </li>
          </ul>
        </nav>
      </div>

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/logout">
          <Logout user={user} setUser={setUser} />
        </Route>

        <Route path="/conversation">
          <Conversation />
        </Route>
      </Switch>
    </Router>
  );
}

export { App };
