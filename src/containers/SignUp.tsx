import React, { useState } from "react";
import SignUpForm from "../components/SignUpForm";

function SignUp() {
  // TODO: handle sign up
  const [busy, setBusy] = useState(false);
  const handleSignUp = () => {
    setBusy(true);
  };

  return (
    <SignUpForm
      disabled={busy}
      errorMessage="An error has occurred"
      onSubmit={handleSignUp}
    />
  );
}

export default SignUp;
