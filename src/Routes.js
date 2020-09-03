import React, { useEffect, useState, createContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// Amplify
import Amplify from "@aws-amplify/core";
import Auth from "@aws-amplify/auth";
import { Hub } from "@aws-amplify/core";
// Components
import ScrollToTop from "./components/ScrollToTop";
import TopMenu from "./components/TopMenu";
// Pages
import Home from "./pages/Home";
import Signin from "./pages/Signin";
// Config
import aws_exports from "./aws-exports";
// Style
import styled from "styled-components";

export const UserContext = createContext();

Amplify.configure(aws_exports);

const Routes = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserData();

    Hub.listen("auth", (data) => {
      const event = data.payload.event;

      switch (event) {
        case "signIn":
          console.log(`user signed in`);
          break;
        case "signUp":
          console.log(`user signed up`);
          break;
        case "signOut":
          console.log(`user signed out`);
          setUser(null);
          break;
        case "signIn_failure":
          console.log("user sign in failed");
          break;
        case "configured":
          console.log("the Auth module is configured");
          break;
        default:
          console.log("Users state");
      }
    });
  }, []);

  const getUserData = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      user ? setUser(user) : setUser(null);
    } catch (err) {
      console.log({ err });
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
    <UserContext.Provider value={{ user }}>
      <Router>
        <div>
          <TopMenu signOut={handleSignOut} />
          {user && <p>Kia ora {user.username}</p>}

          <ScrollToTop />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>

            {!user && (
              <Route path="/signin">
                <Signin />
              </Route>
            )}
          </Switch>
        </div>
      </Router>
    </UserContext.Provider>
  );
};

export default Routes;
