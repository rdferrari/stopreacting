import React from "react";
import { Link } from "react-router-dom";

import { UserContext } from "../Routes";

let deferredPrompt;
const addBtn = document.querySelector(".add-button");

window.addEventListener("beforeinstallprompt", (e) => {
  console.log(e.platforms);
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI to notify the user they can add to home screen
  addBtn.style.display = "block";

  addBtn.addEventListener("click", (e) => {
    // hide our user interface that shows our A2HS button
    addBtn.style.display = "none";
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the A2HS prompt");
      } else {
        console.log("User dismissed the A2HS prompt");
      }
      deferredPrompt = null;
    });
  });
});

const TopMenu = ({ signOut }) => {
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
            <button className="add-button">Install</button>
          </div>
        </div>
      )}
    </UserContext.Consumer>
  );
};

export default TopMenu;
