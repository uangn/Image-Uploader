import React, { useEffect } from "react";
import { useNavigate, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError() as Error;
  const navigate = useNavigate();
  navigate("/auth/login");
  useEffect(() => {
    navigate("/auth/login");
  }, []);

  console.log(error);
  return <h1>{error.message}</h1>;
};

export default ErrorPage;
