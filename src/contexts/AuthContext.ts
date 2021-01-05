import { createContext } from "react";

type ContextProps = {
  clearSecret: () => void;
  hasSecret: () => boolean;
  saveSecret: (secret: string) => void;
  secret: string | null;
};

const AuthContext = createContext<ContextProps>({
  clearSecret: () => {},
  hasSecret: () => false,
  saveSecret: () => {},
  secret: null,
});

export default AuthContext;
