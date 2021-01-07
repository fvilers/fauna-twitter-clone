import { createContext } from "react";

type ContextProps = {
  clearSecret: () => void;
  saveSecret: (secret: string) => void;
  secret: string | null;
};

const AuthContext = createContext<ContextProps>({
  clearSecret: () => {},
  saveSecret: () => {},
  secret: null,
});

export default AuthContext;
