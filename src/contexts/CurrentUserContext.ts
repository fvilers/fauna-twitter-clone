import { createContext } from "react";
import UserModel from "../models/UserModel";

type ContextProps = {
  user: UserModel | null;
};

const CurrentUserContext = createContext<ContextProps>({
  user: null,
});

export default CurrentUserContext;
