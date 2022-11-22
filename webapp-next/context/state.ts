import React from "react";
import { TUser } from "../pages/api/users/types";

type ContextType = {
  jwt?: string | null;
  updateJwt: (jwt: string) => void;
  user: TUser | {};
  updateUser: (user: TUser) => void;
};

const initialContext: ContextType = {
  jwt: null,
  updateJwt: (jwt: string) => {
    console.log(`jwt setter not initialized / trying to set ${jwt}`);
  },
  user: {} as TUser,
  updateUser: (user: TUser) => {},
};
const AppContext = React.createContext(initialContext);

export default AppContext;
