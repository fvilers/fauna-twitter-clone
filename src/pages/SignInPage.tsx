import React from "react";
import { Link, useLocation } from "react-router-dom";

type State = {
  username: string;
};

function SignInPage() {
  const location = useLocation<State>();

  return (
    <div>
      <h1>Sign in</h1>
      <footer>
        Don't have an account ? <Link to="/sign-up">Sign up now</Link>
      </footer>
    </div>
  );
}

export default SignInPage;
