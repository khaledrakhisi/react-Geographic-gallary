import { createContext } from "react";

export const AuthContext = createContext({
  loggedinUser : null,
  login: () => {},
  logoff: () => {},
});
