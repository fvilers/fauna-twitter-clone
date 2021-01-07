import assert from "assert";
import React, { ReactNode, useContext, useEffect, useState } from "react";
import Loading from "../components/Loading";
import Message from "../components/Message";
import AuthContext from "../contexts/AuthContext";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { getCurrentUser } from "../db/Users";
import UserModel from "../models/UserModel";
import AsyncOperation from "../types/AsyncOperation";

type Props = {
  children: ReactNode;
};

type State = AsyncOperation & {
  user?: UserModel;
};

function CurrentUserProvider({ children }: Props) {
  const [{ busy, errorMessage, user }, setState] = useState<State>({
    busy: false,
  });
  const { secret } = useContext(AuthContext);

  useEffect(() => {
    assert(secret);

    const loadData = async () => {
      setState((s) => ({ ...s, busy: true, errorMessage: undefined }));

      try {
        const user = await getCurrentUser(secret);
        setState({ busy: false, user });
      } catch (error) {
        console.error(error);
        setState((s) => ({
          ...s,
          busy: false,
          errorMessage: error.description || error.message,
        }));
      }
    };

    loadData();
  }, [secret]);

  if (busy || user === undefined) {
    return <Loading message="Loading user..." />;
  }

  if (errorMessage) {
    return <Message variant="error">{errorMessage}</Message>;
  }

  return (
    <CurrentUserContext.Provider value={{ user }}>
      {children}
    </CurrentUserContext.Provider>
  );
}

export default CurrentUserProvider;
