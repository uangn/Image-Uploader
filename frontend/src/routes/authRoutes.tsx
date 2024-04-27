import { RouteObject } from "react-router-dom";
import LoginPage from "../pages/Login/LoginPage";
import SignUpPage from "../pages/SignUp/SignUpPage";
import AuthWrapper from "../components/AuthWrapper";

const authRoutes: RouteObject = {
  element: <AuthWrapper />,
  path: "/auth",
  children: [
    { element: <LoginPage />, path: "login" },
    { element: <SignUpPage />, path: "signup" },
  ],
};

export default authRoutes;
