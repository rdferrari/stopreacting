import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "../Routes";

const TopMenu = ({ signOut }) => {
  // console.log(handleInstallPwa);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
      // Update UI notify the user they can install the PWA
      // showInstallPromotion();
    });
  }, []);

  console.log(deferredPrompt);

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
            <button onClick={() => deferredPrompt.prompt()}>Install</button>
          </div>
        </div>
      )}
    </UserContext.Consumer>
  );
};

export default TopMenu;
