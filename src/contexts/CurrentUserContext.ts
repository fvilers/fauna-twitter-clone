import { createContext } from "react";
import UserModel from "../models/UserModel";

type ContextProps = {
  user?: UserModel;
};

const CurrentUserContext = createContext<ContextProps>({});

export default CurrentUserContext;
