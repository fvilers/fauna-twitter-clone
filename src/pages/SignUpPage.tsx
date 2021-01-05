import React from "react";
import { Link } from "react-router-dom";
import SignUp from "../containers/SignUp";

function SignUpPage() {
  return (
    <div>
      <h1>Sign up</h1>
      <SignUp />
      <footer>
        Already have an account ? <Link to="/sign-in">Sign in instead</Link>
      </footer>
    </div>
  );
}

export default SignUpPage;
