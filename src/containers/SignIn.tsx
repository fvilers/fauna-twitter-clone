import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import SignInForm, { SignInFormValues } from "../components/SignInForm";
import AuthContext from "../contexts/AuthContext";
import { signIn } from "../db/Users";
import AsyncOperation from "../types/AsyncOperation";

type Props = {
  username?: string;
};

function SignIn({ username }: Props) {
  const [{ busy, errorMessage }, setOperation] = useState<AsyncOperation>({
    busy: false,
  });
  const { saveSecret } = useContext(AuthContext);
  const history = useHistory();
  const handleSignIn = async ({ username, password }: SignInFormValues) => {
    setOperation({ busy: true, errorMessage: undefined });

    try {
      const secret = await signIn(username, password);
      saveSecret(secret);
      console.log(secret);
      setOperation({ busy: false });
      history.push("/");
    } catch (error) {
      console.log(error);
      setOperation({
        busy: false,
        errorMessage: error.description || error.message,
      });
    }
  };

  return (
    <SignInForm
      defaultValues={{ username }}
      disabled={busy}
      errorMessage={errorMessage}
      onSubmit={handleSignIn}
    />
  );
}

export default SignIn;
