import React from "react";
import { NavLink } from "react-router-dom";
import "./Nav.css";

function Nav() {
  return (
    <div className="Nav">
      <ul>
        <li>
          <NavLink activeClassName="active" exact to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" exact to="/foo">
            404 page
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Nav;
