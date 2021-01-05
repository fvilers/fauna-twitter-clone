import React from "react";
import SignInForm from "../components/SignInForm";

type Props = {
  username?: string;
};

function SignIn({ username }: Props) {
  // TODO: handle sign in
  const handleSignIn = () => {};

  return <SignInForm onSubmit={handleSignIn} />;
}

export default SignIn;
