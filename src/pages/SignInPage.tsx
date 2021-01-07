import React from "react";
import { Link, useLocation } from "react-router-dom";
import SignIn from "../containers/SignIn";

type State = {
  username: string;
};

function SignInPage() {
  const location = useLocation<State>();

  return (
    <main>
      <h1>Sign in</h1>
      <SignIn username={location.state?.username} />
      <footer>
        Don't have an account ? <Link to="/sign-up">Sign up now</Link>
      </footer>
    </main>
  );
}

export default SignInPage;
