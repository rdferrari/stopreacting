import React from "react";
import { Link } from "react-router-dom";

const TopMenu = () => {
  return (
    <div>
      <Link to="/">
        <button>Home</button>
      </Link>
      <Link to="/signin">
        <button>Sign in</button>
      </Link>
    </div>
  );
};

export default TopMenu;
