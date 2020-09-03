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

  const handleInstallPwa = () => {
    installPromptEvent.prompt();

    installPromptEvent.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the A2HS prompt");
      } else {
        console.log("User dismissed the A2HS prompt");
      }
    });
  };

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
            <button onClick={handleInstallPwa}>Install</button>
          </div>
        </div>
      )}
    </UserContext.Consumer>
  );
};

export default TopMenu;
