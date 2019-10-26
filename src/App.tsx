import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import styled from "styled-components";

import { db } from "./clients/db.client";
import { logger } from "./clients/logger.client";
import { Conversation } from "./pages/Conversation.page";
import { Home } from "./pages/Home.page";
import { Invoices } from "./pages/Invoices.page";
import { createNewUser } from "./services/user.service";
import { User } from "./types/user";

function App() {
  const [uid, setUid] = useState<string>();
  const [user, setUser] = useState<User>();

  // Create new user if needed
  useEffect(() => {
    createNewUser()
      .then(newUID => {
        setUid(newUID);

        db.collection("users")
          .doc(newUID)
          .onSnapshot(userSnapshot => {
            setUser(userSnapshot.data() as any);
          });
      })
      .catch(logger.error);
  }, []);

  return (
    <Router>
      <NavBar>
        <Logo src="./original_johns_cupcakes.png" />

        <NavContainer>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>

          {uid ? (
            <li>
              <NavLink to="/conversation">Order Now!</NavLink>
            </li>
          ) : null}

          {uid ? (
            <li>
              <NavLink to="/invoices">Invoices</NavLink>
            </li>
          ) : null}
        </NavContainer>

        {user ? (
          <AvatarContainer>
            <AvatarImage src="avatar.png" />
            {user.name ? <AvatarText>Name: {user.name}</AvatarText> : null}
            {user.email ? <AvatarText>Email: {user.email}</AvatarText> : null}
          </AvatarContainer>
        ) : null}
      </NavBar>

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route path="/conversation">
          {uid ? <Conversation uid={uid} /> : null}
        </Route>

        <Route path="/invoices">{uid ? <Invoices uid={uid} /> : null}</Route>
      </Switch>
    </Router>
  );
}

const AvatarContainer = styled.div`
  align-items: center;
  justify-content: flex-start;
  list-style-type: none;
  padding: 0;

  * + * {
    margin-left: var(--rel-xsmall);
  }

  @media only screen and (max-width: 600px) {
    display: flex;
    flex: 1;
    padding: var(--rel-xsmall);

    * + * {
      margin-left: var(--rel-small);
    }
  }
`;

const AvatarImage = styled.img`
  display: block;
  height: var(--px-large);
  margin: 0 auto;
  width: var(--px-large);

  @media only screen and (max-width: 600px) {
    margin: 0 10px 0 var(--rel-xxsmall);
  }
`;

const AvatarText = styled.p`
  text-align: center;
  margin: var(--rel-xsmall) 0;

  @media only screen and (max-width: 600px) {
    margin-left: var(--rel-small);
  }
`;

const Logo = styled.img`
  width: 150px;
`;

const NavBar = styled.nav`
  padding: var(--rel-xxsmall);
  margin: 0;
  display: flex;
  flex-direction: row;

  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

const NavContainer = styled.ul`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: flex-start;
  list-style-type: none;
  padding: 0;

  * + * {
    margin-left: var(--rel-xsmall);
  }

  @media only screen and (max-width: 600px) {
    padding: var(--rel-xxsmall);

    * + * {
      margin-left: var(--rel-xxsmall);
    }
  }
`;

const NavLink = styled(Link)`
  border-radius: var(--rel-small);
  color: var(--black);
  padding: var(--px-small) var(--px-medium);
  text-decoration: none;
`;

export { App };
