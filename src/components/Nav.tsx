import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import SignOut from "../containers/SignOut";
import AuthContext from "../contexts/AuthContext";
import "./Nav.css";

function Nav() {
  const { hasSecret } = useContext(AuthContext);

  return (
    <div className="Nav">
      <ul>
        <li>
          <NavLink activeClassName="active" exact to="/">
            Home
          </NavLink>
        </li>
        {hasSecret() ? (
          <>
            <li>
              <SignOut />
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink activeClassName="active" exact to="/sign-in">
                Sign in
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" exact to="/sign-up">
                Sign up
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default Nav;
