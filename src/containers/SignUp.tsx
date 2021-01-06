import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import SignUpForm, { SignUpFormValues } from "../components/SignUpForm";
import { signUp } from "../db/Users";
import AsyncOperation from "../types/AsyncOperation";

function SignUp() {
  const [{ busy, errorMessage }, setOperation] = useState<AsyncOperation>({
    busy: false,
  });
  const history = useHistory();
  const handleSignUp = async ({ username, password }: SignUpFormValues) => {
    setOperation({ busy: true, errorMessage: undefined });

    try {
      const user = await signUp(username, password);
      setOperation({ busy: false });
      history.push("/sign-in", { username: user.username });
    } catch (error) {
      console.error(error);
      setOperation({
        busy: false,
        errorMessage: error.description || error.message,
      });
    }
  };

  return (
    <SignUpForm
      disabled={busy}
      errorMessage={errorMessage}
      onSubmit={handleSignUp}
    />
  );
}

export default SignUp;
