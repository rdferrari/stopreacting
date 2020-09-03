import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "../Routes";

const TopMenu = ({ signOut }) => {
  const [installPromptEvent, setInstallPromptEvent] = useState();
  useEffect(() => {
    const beforeInstallPromptHandler = (event) => {
      event.preventDefault();

      // store the event for later use
      setInstallPromptEvent(event);
    };
    window.addEventListener("beforeinstallprompt", beforeInstallPromptHandler);
    return () =>
      window.removeEventListener(
        "beforeinstallprompt",
        beforeInstallPromptHandler
      );
  }, []);

  //   const handleInstallDeclined = () => {
  //     // handleUserSeeingInstallPrompt();
  //     setInstallPromptEvent(null);
  //   };

  const handleInstallAccepted = () => {
    console.log("Install PWA");
    // show native prompt
    installPromptEvent.prompt();

    // decide what to do after the user chooses
    installPromptEvent.userChoice.then((choice) => {
      // if the user declined, we don't want to show the prompt again
      //   if (choice.outcome !== "accepted") {
      //     handleUserSeeingInstallPrompt();
      //   }
      setInstallPromptEvent(null);
    });
  };

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
            <button onClick={handleInstallAccepted}>Install</button>
          </div>
        </div>
      )}
    </UserContext.Consumer>
  );
};

export default TopMenu;
