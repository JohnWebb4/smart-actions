import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import styled from "styled-components";

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
      <NavBar>
        <h1>Smart Actions</h1>

        <NavContainer>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>

          {uid ? (
            <li>
              <NavLink to="/conversation">Conversation</NavLink>
            </li>
          ) : null}
        </NavContainer>
      </NavBar>

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

const NavBar = styled.nav`
  padding: var(--rel-xxsmall);
  margin: 0;
  display: flex;
  flex-direction: row;
`;

const NavContainer = styled.ul`
  align-items: center;
  display: flex;
  flex: 1;
  list-style-type: none;
  justify-content: flex-left;
  * + * {
    margin-left: var(--rel-xsmall);
  }
`;

const NavLink = styled(Link)`
  border-radius: var(--rel-small);
  color: var(--black);
  padding: var(--px-small) var(--px-medium);
  text-decoration: none;
`;

export { App };
