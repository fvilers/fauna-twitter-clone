import React, { ReactNode, useEffect, useState } from "react";
import AuthContext from "../contexts/AuthContext";

const SECRET_KEY = "user:secret";

type Props = {
  children: ReactNode;
};

function AuthProvider({ children }: Props) {
  const [secret, setSecret] = useState(window.localStorage.getItem(SECRET_KEY));
  const clearSecret = () => {
    window.localStorage.removeItem(SECRET_KEY);
    setSecret(null);
  };
  const hasSecret = () => secret !== null;
  const saveSecret = (secret: string) => {
    window.localStorage.setItem(SECRET_KEY, secret);
    setSecret(secret);
  };

  // This effect monitors if the secret has been modified outside the app
  useEffect(() => {
    const handler = () => {
      setSecret(window.localStorage.getItem(SECRET_KEY));
    };
    window.addEventListener("storage", handler);

    return () => {
      window.removeEventListener("storage", handler);
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ clearSecret, hasSecret, saveSecret, secret }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
