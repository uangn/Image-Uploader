import React from "react";
import { Link, Outlet } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            {" "}
            <Link to="/image-upload">Upload</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default NavBar;
