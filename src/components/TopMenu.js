import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "../Routes";

const TopMenu = ({ signOut }) => {
  const [installPromptEvent, setInstallPromptEvent] = useState();

  useEffect(() => {
    const beforeInstallPromptHandler = (event) => {
      event.preventDefault();
      setInstallPromptEvent(event);
    };
    window.addEventListener("beforeinstallprompt", beforeInstallPromptHandler);
    return () =>
      window.removeEventListener(
        "beforeinstallprompt",
        beforeInstallPromptHandler
      );
  }, []);

  console.log(installPromptEvent);

  return (
    <UserContext.Consumer>
      {({ user }) => (
        <div>
          <Link to="/">
            <button>Home</button>
          </Link>
          {!user ? (
            <Link to="/signin">
              <button>Sign in</button>
            </Link>
          ) : (
            <button onClick={() => signOut}>Sign out</button>
          )}
          <div>
            <button>Install</button>
          </div>
        </div>
      )}
    </UserContext.Consumer>
  );
};

export default TopMenu;
