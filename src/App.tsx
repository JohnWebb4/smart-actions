import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

import { logger } from "./clients/logger.client";
import { Conversation } from "./pages/Conversation.page";
import { Home } from "./pages/Home.page";
import { createNewUser } from "./services/user.service";

function App() {
  const [uid, setUID] = useState<string>();

  useEffect(() => {
    createNewUser()
      .then(newUID => {
        setUID(newUID);
      })
      .catch(logger.error);
  }, []);

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>

            {uid ? (
              <li>
                <Link to="/conversation">Conversation</Link>
              </li>
            ) : null}
          </ul>
        </nav>
      </div>

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route path="/conversation">
          {uid ? <Conversation uid={uid} /> : null}
        </Route>
      </Switch>
    </Router>
  );
}

export { App };
