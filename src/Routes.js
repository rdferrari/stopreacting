import React, { useEffect, useState, createContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Amplify from "@aws-amplify/core";
import Auth from "@aws-amplify/auth";
import { Hub } from "@aws-amplify/core";
import styled from "styled-components";
// Components
import ScrollToTop from "./components/ScrollToTop";
import TopMenu from "./components/TopMenu";
// Pages
import Home from "./pages/Home";
import Signin from "./pages/Signin";

import aws_exports from "./aws-exports";

export const UserContext = createContext();

Amplify.configure(aws_exports);

const Routes = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(null);
  const [group, setGroup] = useState(null);

  useEffect(() => {
    getUserData();

    Hub.listen("auth", (data) => {
      const { payload } = data;
      listener(payload);

      const groupUsers =
        data.payload.data.signInUserSession.idToken.payload["cognito:groups"];

      if (groupUsers) {
        console.log(groupUsers[0]);
        setGroup(groupUsers[0]);
      }
      const username = data.payload.data.username;
      setUsername(username);
      console.log(username + " has " + data.payload.event);
    });
  }, []);

  const getUserData = async () => {
    const user = await Auth.currentAuthenticatedUser();
    user ? setUser(user) : setUser(null);

    const groupUsers = user.signInUserSession.idToken.payload["cognito:groups"];

    if (groupUsers) {
      console.log(groupUsers[0]);
      setGroup(groupUsers[0]);
    }
  };

  const listener = (payload) => {
    switch (payload.event) {
      case "signIn":
        getUserData();
        break;
      case "signUp":
        console.log("sign up");
        break;
      case "signOut":
        getUserData();
        setUser(null);
        setUsername(null);
        setGroup(null);
        break;
      default:
        return;
    }
  };

  const handleSignOut = async () => {
    try {
      await Auth.signOut();
    } catch (err) {
      console.log("Error signing out user", err);
    }
  };

  return (
    <UserContext.Provider value={{ user, username }}>
      <Router>
        <div>
          <TopMenu handleSignOut={handleSignOut} />

          <ScrollToTop />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/signin">
              <Signin />
            </Route>
          </Switch>
        </div>
      </Router>
    </UserContext.Provider>
  );
};

export default Routes;
