import assert from "assert";
import React, { useContext, useState } from "react";
import Button from "../components/Button";
import AuthContext from "../contexts/AuthContext";
import { signOut } from "../db/Users";
import AsyncOperation from "../types/AsyncOperation";

function SignOut() {
  const [{ busy }, setOperation] = useState<AsyncOperation>({
    busy: false,
  });
  const { secret, clearSecret } = useContext(AuthContext);
  const handleSignOut = async () => {
    setOperation({ busy: true, errorMessage: undefined });

    try {
      assert(secret);
      const success = await signOut(secret);

      if (success) {
        // Clearing secret will trigger a full repaint of the app
        clearSecret();
      } else {
        setOperation({ busy: false });
      }
    } catch (error) {
      console.log(error);
      setOperation({
        busy: false,
        errorMessage: error.description || error.message,
      });
    }
  };

  return (
    <Button disabled={busy} onClick={handleSignOut} variant="link">
      Sign out
    </Button>
  );
}

export default SignOut;
