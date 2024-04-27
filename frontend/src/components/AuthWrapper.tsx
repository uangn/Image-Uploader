import React, { useEffect } from "react";
import styles from "./css/AuthWrapper.module.css";
import { Outlet, useLocation } from "react-router-dom";

const AuthWrapper = () => {
  const location = useLocation();
  useEffect(() => {
    switch (location.pathname) {
      case "/auth/login":
        document.title = "Login";
        break;
      case "/auth/signup":
        document.title = "Sign up";
        break;
      default:
        break;
    }
  }, [location.pathname]);

  return (
    <div className={styles["wrapper"]}>
      <Outlet />
    </div>
  );
};

export default AuthWrapper;
