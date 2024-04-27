import { createContext } from "react";
import User from "../models/User";

const AuthContext = createContext({
  user: {} as User,
  setUser: (n: User | null) => {},
});
export default AuthContext;
