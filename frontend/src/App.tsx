import "./App.css";
import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import appRoutes from "./routes/appRoutes";
import authRoutes from "./routes/authRoutes";
import AuthContext from "./stores/authContext";
import { useEffect, useState } from "react";
import User from "./models/User";

const router = createBrowserRouter([appRoutes, authRoutes] as RouteObject[]);

function App() {
  const [user, setUser] = useState<User | null>();

  return (
    <AuthContext.Provider
      value={{
        user: user as User,
        setUser,
      }}
    >
      <RouterProvider router={router} />
    </AuthContext.Provider>
  );
}

export default App;
