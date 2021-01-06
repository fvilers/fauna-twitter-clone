import React, { useContext } from "react";
import { Link } from "react-router-dom";
import SignOut from "../containers/SignOut";
import AuthContext from "../contexts/AuthContext";
import "./Nav.css";

function Nav() {
  const { hasSecret } = useContext(AuthContext);

  return (
    <div className="Nav">
      <h1>
        <Link to="/">Twitter clone</Link>
      </h1>
      <nav>
        <ul>
          {hasSecret() ? (
            <>
              <li>
                <SignOut />
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/sign-in">Sign in</Link>
              </li>
              <li>
                <Link className="outline" to="/sign-up">
                  Sign up
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Nav;
